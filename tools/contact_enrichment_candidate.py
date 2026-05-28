#!/usr/bin/env python3
import csv
import json
import re
import unicodedata
from pathlib import Path


ROOT = Path("/Users/u6181388/Documents/05-Business/02_CRM-Client-Engagement/Contacts")
MASTER = ROOT / "00_Contacts-Master.csv"
INSTITUTIONS = ROOT / "_Email-Generator" / "au_institutions.json"
OUT_DIR = Path("/Users/u6181388/Documents/05-Business/Websites/DrWeliDotCom/contact_enrichment")
OUT_CSV = OUT_DIR / "00_Contacts-Master.candidate.csv"
AUDIT_CSV = OUT_DIR / "email_enrichment_audit.csv"
GOOGLE_CSV = OUT_DIR / "google_contacts_to_review.csv"


# Public web matches found in the first verification pass. Keep these conservative:
# only exact addresses exposed by public institutional/staff pages or publication pages.
CONFIRMED_EMAILS = {
    "CONT-0003": ("madhav.raman@unsw.edu.au", "Public UNSW student wellbeing page showed Madhav Raman contact."),
    "CONT-0004": ("s.maddison@unsw.edu.au", "UNSW handbook/archive pages list Sarah Maddison email."),
    "CONT-0006": ("trea.murphy@unsw.edu.au", "UNSW Faculty of Science leadership page lists Trea Murphy email."),
    "CONT-0020": ("michael.jennions@anu.edu.au", "ANU public course/Gender Institute pages list Michael Jennions email."),
    "CONT-0021": ("megan.head@anu.edu.au", "ANU CBA/STEM Women pages list Megan Head email."),
    "CONT-0023": ("loeske.kruuk@anu.edu.au", "ANU profile/course pages list Loeske Kruuk email."),
    "CONT-0025": ("rob.lanfear@anu.edu.au", "ANU Research School of Biology page lists Robert Lanfear email."),
    "CONT-0026": ("adrian.manning@anu.edu.au", "ANU Fenner/ICEDS profile pages list Adrian Manning email."),
    "CONT-0027": ("damien.farine@anu.edu.au", "ANU public course pages list Damien Farine email."),
    "CONT-0028": ("kiaran.kirk@anu.edu.au", "ANU Research School of Biology page lists Kiaran Kirk email."),
    "CONT-0029": ("vc@anu.edu.au", "ANU services page lists the Interim Vice-Chancellor office email for Rebekah Brown."),
    "CONT-0032": ("dieter.hochuli@sydney.edu.au", "University of Sydney Integrative Ecology Lab page lists Dieter Hochuli email."),
    "CONT-0033": ("mathew.crowther@sydney.edu.au", "ORCID/Earth Observation Lab pages list Mathew Crowther email."),
    "CONT-0034": ("tanya.latty@sydney.edu.au", "University of Sydney/Invertebrate Behaviour Lab pages list Tanya Latty email."),
    "CONT-0035": ("peter.banks@sydney.edu.au", "University of Sydney ecology material lists Peter Banks email."),
    "CONT-0036": ("catherine.price@sydney.edu.au", "University of Sydney profile lists Catherine Price email."),
    "CONT-0037": ("clare.mcarthur@sydney.edu.au", "University of Sydney ecology/profile material lists Clare McArthur email."),
    "CONT-0038": ("carolyn.hogg@sydney.edu.au", "CIPPS/Australian BioCommons pages list Carolyn Hogg email."),
    "CONT-0042": ("james.wallman@uts.edu.au", "UTS handbook page lists James Wallman email."),
    "CONT-0043": ("emma.camp@uts.edu.au", "UTS subject outline/profile material lists Emma Camp email."),
    "CONT-0044": ("jonathan.webb@uts.edu.au", "UTS honours project booklet lists Jonathan Webb email."),
    "CONT-0045": ("david.booth@uts.edu.au", "UTS honours/project material lists David Booth email."),
    "CONT-0046": ("peter.ralph@uts.edu.au", "UTS public material lists Peter Ralph email."),
    "CONT-0047": ("mathieu.pernice@uts.edu.au", "Publication/UTS material lists Mathieu Pernice email."),
    "CONT-0048": ("stuart.white@uts.edu.au", "UTS calendar material lists Stuart White email."),
    "CONT-0049": ("sujatha.raman@anu.edu.au", "ANU public course/submission pages list Sujatha Raman email."),
    "CONT-0050": ("will.grant@anu.edu.au", "ANU CPAS profile lists Will Grant email."),
    "CONT-0054": ("anna.reid@sydney.edu.au", "Sydney Conservatorium/USyd materials list Anna Reid email."),
    "CONT-0061": ("susanna.scarparo@sydney.edu.au", "University of Sydney public policy feedback PDF lists Susanna Scarparo email."),
    "CONT-0063": ("d.curnoe@unsw.edu.au", "UNSW staff profile lists Darren Curnoe email."),
    "CONT-0069": ("caleb.kelly@unsw.edu.au", "UNSW staff profile lists Caleb Kelly email."),
    "CONT-0070": ("a.munster@unsw.edu.au", "UNSW staff profile lists Anna Munster email."),
    "CONT-0108": ("genevieve@genevievelacey.com", "Genevieve Lacey official contact page lists this email."),
    "CONT-0110": ("rob.brooks@unsw.edu.au", "UNSW course/staff material lists Rob Brooks email."),
    "CONT-0115": ("oron.catts@uwa.edu.au", "UWA research profile lists Oron Catts email."),
}


EXTRA_DOMAINS = {
    "abc": ("abc.net.au", ["{first}.{last}", "{f}{last}", "{first}{last}"]),
    "aas": ("science.org.au", ["{first}.{last}", "{f}{last}", "{first}{last}"]),
    "creative": ("creative.gov.au", ["{first}.{last}", "{f}{last}", "{first}{last}"]),
    "ausmuseum": ("australian.museum", ["{first}.{last}", "{f}{last}", "{first}{last}"]),
    "questacon": ("questacon.edu.au", ["{first}.{last}", "{f}{last}", "{first}{last}"]),
    "apraamcos": ("apraamcos.com.au", ["{first}.{last}", "{f}{last}", "{first}{last}"]),
    "musicnsw": ("musicnsw.com", ["{first}", "{first}.{last}", "{f}{last}"]),
    "soundnsw": ("create.nsw.gov.au", ["{first}.{last}", "{f}{last}", "{first}{last}"]),
    "documentaryaus": ("documentaryaustralia.com.au", ["{first}.{last}", "{f}{last}", "{first}{last}"]),
    "sydneyfest": ("sydneyfestival.org.au", ["{first}.{last}", "{first}", "{f}{last}"]),
    "vividsyd": ("dnsw.com.au", ["{first}.{last}", "{f}{last}", "{first}{last}"]),
    "carriageworks": ("carriageworks.com.au", ["{first}.{last}", "{first}", "{f}{last}"]),
    "bundanon": ("bundanon.com.au", ["{first}.{last}", "{first}", "{f}{last}"]),
    "darkmofo": ("darkmofo.net.au", ["{first}.{last}", "{first}", "{f}{last}"]),
    "darklab": ("darklab.net.au", ["{first}.{last}", "{first}", "{f}{last}"]),
    "iansw": ("inspiringnsw.org.au", ["{first}.{last}", "{f}{last}", "{first}{last}"]),
    "listeningearth": ("listeningearth.com", ["{first}", "{first}.{last}", "{f}{last}"]),
}


GOOGLE_CONTACTS = [
    ("UNSW Societal Impact Team", "SIF@unsw.edu.au", "UNSW Sydney", "unsw", "Societal Impact Team", "societal_impact"),
    ("UNSW Societal Impact", "societal.impact@unsw.edu.au", "UNSW Sydney", "unsw", "Societal Impact", "societal_impact"),
    ("Societal Impact & Translation Team", "SocietalImpactandTranslation@groups.unsw.edu.au", "UNSW Sydney", "unsw", "Societal Impact & Translation Team", "societal_impact"),
    ("ADA Societal Impact, Equity & Engagement", "ADASIEE@unsw.edu.au", "UNSW Sydney", "unsw", "ADA Societal Impact, Equity & Engagement", "societal_impact"),
    ("Equity Diversity Inclusion", "edi@unsw.edu.au", "UNSW Sydney", "unsw", "Equity Diversity Inclusion", "dei_officer"),
    ("Science Student Experience", "sci.studentexp@unsw.edu.au", "UNSW Sydney", "unsw", "Science Student Experience", "student_experience"),
    ("University of Sydney - Student Wellbeing", "student.wellbeing@sydney.edu.au", "University of Sydney", "usyd", "Student Wellbeing", "student_wellbeing"),
    ("University of Sydney - Engagement Team", "engage.team@sydney.edu.au", "University of Sydney", "usyd", "Engagement Team", "societal_impact"),
    ("University of Sydney - Global Engagement", "pvc.ge@sydney.edu.au", "University of Sydney", "usyd", "Global Engagement", "societal_impact"),
    ("Macquarie University - Student Wellbeing", "studentwellbeing@mq.edu.au", "Macquarie University", "mq", "Student Wellbeing", "student_wellbeing"),
    ("Macquarie University - Student Engagement / Programs", "engagement@mq.edu.au", "Macquarie University", "mq", "Student Engagement / Programs", "student_experience"),
    ("Macquarie University - Equity, Diversity & Inclusion", "equity@mq.edu.au", "Macquarie University", "mq", "Equity, Diversity & Inclusion", "dei_officer"),
    ("Macquarie University - Partnerships / External Engagement", "partnerships@mq.edu.au", "Macquarie University", "mq", "Partnerships / External Engagement", "societal_impact"),
    ("UTS - UTS Engagement", "engagement@uts.edu.au", "University of Technology Sydney", "uts", "UTS Engagement", "societal_impact"),
    ("UTS - ActivateUTS", "activateuts@uts.edu.au", "University of Technology Sydney", "uts", "ActivateUTS", "student_experience"),
]


def clean_part(value: str) -> str:
    value = "".join(
        c for c in unicodedata.normalize("NFD", value.lower().strip())
        if unicodedata.category(c) != "Mn"
    )
    value = value.replace("'", "")
    value = re.sub(r"[^a-z0-9 -]", "", value)
    return value.replace(" ", "")


def split_display_name(name: str) -> tuple[str, str]:
    cleaned = re.sub(r"^(University of Sydney|Macquarie University|UTS|UNSW Sydney|UNSW)\s*-\s*", "", name).strip()
    parts = cleaned.split()
    if len(parts) >= 2 and all(p[:1].isupper() for p in parts[:2]):
        return parts[0], " ".join(parts[1:])
    return cleaned, ""


def template_for(role_category: str) -> str:
    return {
        "societal_impact": "04_Societal-Impact-Engagement.md",
        "dei_officer": "05_DEI-Inclusion-Officer.md",
        "student_experience": "06_Student-Experience.md",
        "student_wellbeing": "07_Student-Wellbeing.md",
    }.get(role_category, "")


def predictions(row: dict, institutions: dict) -> list[str]:
    if row.get("email"):
        return []
    code = (row.get("institution_code") or "").strip().lower()
    cfg = institutions.get(code)
    if cfg:
        domain = cfg["domain"]
        patterns = cfg.get("patterns", ["{first}.{last}", "{f}.{last}", "{last}"])
    elif code in EXTRA_DOMAINS:
        domain, patterns = EXTRA_DOMAINS[code]
    else:
        return []
    first = clean_part(row.get("first_name", ""))
    last = clean_part(row.get("last_name", ""))
    if not first or not last:
        return []
    f = first[:1]
    seen = []
    for pattern in patterns:
        email = pattern.format(first=first, last=last, f=f) + "@" + domain
        if email not in seen:
            seen.append(email)
    return seen[:3]


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    institutions = json.loads(INSTITUTIONS.read_text())
    with MASTER.open(newline="") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        fields = reader.fieldnames

    audit = []
    existing_emails = {r.get("email", "").strip().lower() for r in rows if r.get("email")}
    existing_names = {(r.get("first_name", "").lower(), r.get("last_name", "").lower()) for r in rows}

    for row in rows:
        cid = row["contact_id"]
        if cid.startswith("CONT-EXAMPLE-"):
            continue
        if cid in CONFIRMED_EMAILS and not row.get("email"):
            email, reason = CONFIRMED_EMAILS[cid]
            row["email"] = email
            row["notes"] = (row.get("notes", "").rstrip() + f" | Email found online: {reason}").strip(" |")
            audit.append({"contact_id": cid, "action": "confirmed_email", "email": email, "source": reason})
        preds = predictions(row, institutions)
        for idx, email in enumerate(preds, start=1):
            key = f"email_predicted_{idx}"
            if not row.get(key):
                row[key] = email
        if preds:
            audit.append({"contact_id": cid, "action": "predicted_emails", "email": "; ".join(preds), "source": "Institutional pattern"})

    next_gc = 1
    google_review = []
    for name, email, institution, code, role_title, role_category in GOOGLE_CONTACTS:
        email_l = email.lower()
        first, last = split_display_name(name)
        present = email_l in existing_emails or (first.lower(), last.lower()) in existing_names
        google_review.append({"name": name, "email": email, "present_in_master_before_candidate": present})
        if present:
            continue
        row = {field: "" for field in fields}
        row.update({
            "contact_id": f"CONT-GC-{next_gc:04d}",
            "first_name": first,
            "last_name": last,
            "preferred_name": first,
            "email": email,
            "institution": institution,
            "institution_code": code,
            "role_title": role_title,
            "role_category": role_category,
            "suggested_template": template_for(role_category),
            "country": "AU",
            "language_pref": "EN",
            "status": "Lead",
            "priority": "Medium",
            "next_action": "Review Google Contacts import before outreach",
            "notes": f"Imported into candidate from Google Contacts search result: {name}",
            "verification_status": "needs-review",
        })
        rows.append(row)
        existing_emails.add(email_l)
        next_gc += 1
        audit.append({"contact_id": row["contact_id"], "action": "google_contact_candidate_add", "email": email, "source": name})

    with OUT_CSV.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)

    with AUDIT_CSV.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["contact_id", "action", "email", "source"])
        writer.writeheader()
        writer.writerows(audit)

    with GOOGLE_CSV.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["name", "email", "present_in_master_before_candidate"])
        writer.writeheader()
        writer.writerows(google_review)

    print(f"candidate={OUT_CSV}")
    print(f"audit={AUDIT_CSV}")
    print(f"google_review={GOOGLE_CSV}")
    print(f"rows_before={len(rows) - (next_gc - 1)}")
    print(f"google_rows_added={next_gc - 1}")
    print(f"audit_rows={len(audit)}")


if __name__ == "__main__":
    main()

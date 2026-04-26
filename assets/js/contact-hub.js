const intentRadios = document.querySelectorAll('input[name="intent"]');
const musicBlock = document.getElementById('musicFields');
const engagementBlock = document.getElementById('engagementFields');
const preview = document.getElementById('contactPreview');

intentRadios.forEach(r => {
  r.addEventListener('change', () => {
    document.querySelectorAll('.contact-choice').forEach(c => c.classList.remove('is-selected'));
    r.closest('.contact-choice').classList.add('is-selected');

    if (r.value === 'music'){
      musicBlock.hidden = false;
      engagementBlock.hidden = true;
    } else {
      musicBlock.hidden = false;
      engagementBlock.hidden = false;
    }
    updatePreview();
  });
});

function updatePreview(){
  const intent = document.querySelector('input[name="intent"]:checked')?.value || '';
  preview.textContent = intent ? 'You are enquiring about: ' + intent : 'Select a direction to tailor the enquiry.';
}

updatePreview();

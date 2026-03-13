// Typing animation for 'Frontend Developer'
const typedText = document.getElementById('typed-text');
const text = 'Data Science & Fullstack Developing';
let idx = 0;
function type() {
  if (idx < text.length) {
    typedText.textContent += text[idx];
    idx++;
    setTimeout(type, 120);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  type();

  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');

      // Hide all tab contents
      tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
      });

      // Show the selected tab
      const selectedTab = document.getElementById(tabName);
      if (selectedTab) {
        selectedTab.classList.add('active');
        selectedTab.style.display = 'block';
      }
    });
  });
});


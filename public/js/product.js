/* eslint-disable prettier/prettier */
function addTag(tag) {
    const tagsContainer = document.getElementById('tags-container');

    // Create a new tag element
    const tagElement = document.createElement('span');
    tagElement.classList.add('badge', 'badge-primary', 'mr-1');
    tagElement.textContent = tag;

    // Create a hidden input field to store the tag value
    const tagInput = document.createElement('input');
    tagInput.type = 'hidden';
    tagInput.name = 'categories';
    tagInput.value = tag;

    // Append the tag element and input field to the container
    tagsContainer.appendChild(tagElement);
    tagsContainer.appendChild(tagInput);
}

// Event listener for handling tag input
const tagsInput = document.getElementById('tags-input');
tagsInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && tagsInput.value.trim() !== '') {
        event.preventDefault();
        addTag(tagsInput.value.trim());
        tagsInput.value = '';
    }
});
// commentForm.js
function createCommentForm(img, displayArea) {
    const commentForm = document.createElement('form');
    commentForm.id = 'commentForm'; 
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.id = 'commentInput';
    commentInput.name = 'comment';

    const commentButton = document.createElement('button');
    commentButton.textContent = 'Post Comment';
    commentButton.id = 'commentButton';
    commentButton.type = 'submit';  // Set the button type to 'submit'

    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentButton);

    return commentForm;
}

export default createCommentForm;


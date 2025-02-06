const CONTAINER_ID = 'comment-container';
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxyGzyVAJru0FcXKfSy3zR5EsGytPz-EV5dctuQOQNTZki9W9OekZsIaFHzHlTIJSc6/exec';

function createCommentWidget() {
    const container = document.createElement('div');
    container.id = CONTAINER_ID;
    container.style.padding = '10px';
    container.style.textAlign = 'center';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Escribe tu comentario...';
    input.style.width = '80%';
    input.style.padding = '8px';
    input.id = 'comment-input';

    const button = document.createElement('button');
    button.innerText = 'Enviar';
    button.style.marginLeft = '10px';
    button.style.padding = '8px';
    button.style.cursor = 'pointer';
    button.onclick = sendComment;

    container.appendChild(input);
    container.appendChild(button);
    document.body.appendChild(container);
}

function sendComment() {
    const input = document.getElementById('comment-input');
    if (!input.value) {
        alert('Por favor, ingresa un comentario.');
        return;
    }

    fetch(SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cliente: 'Cliente Test', 
            Periodo: '2024-02', 
            observaciones: input.value, 
            usuario: 'Usuario Test'
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Comentario guardado correctamente.');
        input.value = '';
    })
    .catch(error => console.error('Error:', error));
}

window.onload = createCommentWidget;

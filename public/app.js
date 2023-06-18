document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('endereco-form');
    const ruaEl = document.getElementById('rua');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const cep = formData.get('cep');

        try {
            const res = await fetch('/endereco', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cep }),
            });
            if (!res.ok) {
                throw new Error('CEP inválido.');
            }
            const endereco = await res.json();
            ruaEl.textContent = endereco.logradouro;
        } catch (error) {
            ruaEl.textContent = 'Erro: ' + error.message;
        }
    });
});
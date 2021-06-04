
const form = document.querySelector('form');
form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'post',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await response.json();
        if (data) {
            location.assign(data.redirect);
        }

    } catch (error) {
        console.log(error);
    }
});

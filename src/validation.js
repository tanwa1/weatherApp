export function validateForm() {
    const inputValidate = Array.from(document.querySelectorAll('#todoUpForm input, #todoUpForm select, #todoUpForm textarea'));

    for (const input of inputValidate) {
        if (!input.value) {
            alert("Fill out require inputs")
            return false;
        }
    }

    const description = document.getElementById('description');

    if (!description.innerText.trim()) {
        alert("Fill out require inputs")
        return false;
    }

    return true;
}
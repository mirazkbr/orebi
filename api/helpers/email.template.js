
function emailTemplate(token){
    return `<div>
                <h1>Welcome to OREBI</h1>
                <p>Thanks for joining us</p>
                <p>Happy Coding</p>
                <p>${token}</p>
                <a href="#">click to verification</a>
            </div>`;
}
module.exports = emailTemplate
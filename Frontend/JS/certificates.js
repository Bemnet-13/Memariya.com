
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'));
const id = user.id
const studentName = user.name
// const courseId = localStorage.getItem('courseId')

const container = document.getElementById('container');
// console.log(id, token, courseId, container.innerHTML)

const currentDate = new Date();
        // Format the date as yyyy-mm-dd
const formattedDate = currentDate.toISOString().split('T')[0];


const getCertificate = async () => { 
    try { 
        const response = await fetch(`http://localhost:3000/api/v1/students/${id}/certificates`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'Authorization': token
            }

        })
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.msg)
        }
        const form = data.map(certificate => {
            return `<div class="certificate-1 border-2 border-blue-500 p-6 rounded-lg mt-8">
                        <p class="text-xl font-semibold">Course: ${certificate.name}</p>
                        <p class="text-lg">Level: ${certificate.level}</p>
                        <p class="text-md mt-4">This is to certify that</p>
                        <p class="text-2xl font-bold">[${studentName}]</p>
                        <p class="text-md mt-2">has successfully completed the above-mentioned course with great dedication
                            and commitment.</p>
                        <p class="text-lg mt-4">Issued on: [${formattedDate}]</p>
                    </div>
            `
        }).join('');
        container.innerHTML = form
    
    } catch (error) { return error.message }
}
getCertificate();
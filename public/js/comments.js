const addComment = async (event) =>{
    event.preventDefault();

    const body = document.querySelector('#comment').valur.trim();
    const post_id = document.querySelector('.post_id').getAttribute('value');

    if(body && post_id){
        const response = await fetch('/api/comments',  {
            method: POST,
            body: JSON.stringify({ commentBody: body, post_id}),
            headers:{
                'content-Type': 'application/json',
            }
        });
        if(response.ok){
            document.location.reload();
        }else{
            alert('Failed to create post');
        }
    }
};

document
.querySelector('.new_comment-form')
.addEventListener('submit', addComment);
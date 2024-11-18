	 
	document.addEventListener('DOMContentLoaded', () => {
  const postsCol8 = document.getElementById('posts-col-8');
  const postsCol4 = document.getElementById('posts-col-4');

  fetch('https://ciznomktr8.execute-api.sa-east-1.amazonaws.com/v1/blog')
    .then(response => response.json())
    .then(data => {
      const maxPosts = 4; // Limite de posts a serem exibidos
      const items = data.rss.channel.item;

      for (let i = 0; i < Math.min(items.length, maxPosts); i++) {
        const post = items[i];

        const postElement = document.createElement('div');
        postElement.className = 'post';

        const imgElement = document.createElement('img');
        imgElement.src = post['media:thumbnail'].url;
        imgElement.alt = post.title;

        const imgLinkElement = document.createElement('a');
        imgLinkElement.href = post.link;
        imgLinkElement.target = '_blank'; // Adiciona target="_blank" ao link da imagem
        imgLinkElement.appendChild(imgElement);

        const titleElement = document.createElement('a');
        titleElement.className = 'post-title';
        titleElement.href = post.link; 
        titleElement.target = '_blank'; // Adiciona target="_blank" ao link do título
        titleElement.textContent = post.title;
 
        const postWrapper = document.createElement('div');
        postWrapper.className = 'col-12';

        const linkWrapper = document.createElement('div');
        linkWrapper.className = 'col-6';

        const textWrapper = document.createElement('div');
        textWrapper.className = 'col-6';

        linkWrapper.appendChild(imgLinkElement); // Adiciona o link da imagem ao linkWrapper
        textWrapper.appendChild(titleElement);

        postWrapper.appendChild(linkWrapper);
        postWrapper.appendChild(textWrapper);
        postElement.appendChild(postWrapper);

        if (i < 2) {
          postsCol8.appendChild(postElement);
        } else {
          postsCol4.appendChild(postElement);
        }
      }
    })
    .catch(error => console.error('Erro ao buscar posts:', error));
});

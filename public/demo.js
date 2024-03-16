class PhotoGallery {
    constructor() {
      this.API_KEY = 'ZEDhusJoMXRsjNj0lyLTZmUpAVeaQwmdXUiuXCDf0mB3ZgW22756NaaO ';
      this.galleryDIv = document.querySelector('.gallery');
      this.loadMore = document.querySelector('.load-more');
      this.pageIndex = 1;
      this.eventHandle();
    }
  
    eventHandle() {
      document.addEventListener('DOMContentLoaded', () => {
        this.getImg(1);
      });
      this.loadMore.addEventListener('click', (e) => {
        this.loadMoreImages(e);
      });
    }
  
    async getImg(index) {
      this.loadMore.setAttribute('data-img', 'curated');
      const baseURL = `https://api.pexels.com/v1/search?query=nature+animals&page=${index}&per_page=12`;
      const data = await this.fetchImages(baseURL);
      this.GenerateHTML(data.photos);
      console.log(data);
    }
  
    async fetchImages(baseURL) {
      const response = await fetch(baseURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: this.API_KEY,
        },
      });
      const data = await response.json();
      return data;
    }
  
    GenerateHTML(photos) {
      photos.forEach((photo) => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `
        <a href='${photo.src.original}' target="_blank">
          <img src="${photo.src.medium}">
          <h3>${photo.photographer}</h3>
        </a>
        `;
        this.galleryDIv.appendChild(item);
      });
    }
  
    async loadMoreImages(e) {
      let index = ++this.pageIndex;
      this.getImg(index);
    }
  }
  
  const gallery = new PhotoGallery();
  
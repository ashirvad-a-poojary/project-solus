class VideoGallery {
  constructor() {
    this.API_KEY = 'ZEDhusJoMXRsjNj0lyLTZmUpAVeaQwmdXUiuXCDf0mB3ZgW22756NaaO';
    this.galleryDiv = document.querySelector('.gallery');
    this.pageIndex = 1;
    this.eventHandle();
  }

  eventHandle() {
    document.addEventListener('DOMContentLoaded', () => {
      this.getVideos(1);
    });
    window.addEventListener('scroll', () => {
      if (this.isScrolledToBottom()) {
        this.loadMoreVideos();
      }
    });
  }

  async getVideos(index) {
    const baseURL = `https://api.pexels.com/videos/search?query=nature+animals&page=${index}&per_page=12`;
    const data = await this.fetchVideos(baseURL);
    this.generateHTML(data.videos);
    console.log(data);
  }

  async fetchVideos(baseURL) {
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

  generateHTML(videos) {
    videos.forEach((video) => {
      const item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML = `
      <video controls width="640" height="360">
        <source src="${video.video_files[0].link}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <h3>${video.user.name}</h3>
      `;
      this.galleryDiv.appendChild(item);
    });
  }

  async loadMoreVideos() {
    let index = ++this.pageIndex;
    this.getVideos(index);
  }

  isScrolledToBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
  }
}

const videoGallery = new VideoGallery();

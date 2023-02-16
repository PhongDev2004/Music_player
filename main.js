
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const songThumb = $('.player_img img')
const songName = $('.song_name')
const songAuthor = $('.song_author')
const songThumbPlist = $('.currsongif-img img')
const songNamePList = $('.currsongif-name')
const songAuthorPList = $('.currsongif-author')
const playPausewrapper = $('.play_pause')
const playPauseBtn = $('.play_pause span')
const audio = $('#audio')
const progressWrapper = $('.progress_area')
const progressBar = $('.progress-bar')
const playListWrapper = $('.playlist');
const mainPlayList = $('.main_playlist')
const currentElement = $('.current')
const durationElement = $('.duration')
const prevBtn = $('#prev')
const nextBtn = $('#next')
const repeatLoopBtn = $('#repeat-loop')
const musicListBtn = $('#music_list')
const closeMusicList = $('#close')
const musicListItem = $('.main_playlist')
const musicListPlayBtn = $('.currsongif-info-playpause-btn')
const musicListPrevBtn = $('.currsongif-info-prev-btn')
const musicListNextBtn = $('.currsongif-info-next-btn')
const quantytiSongAlbum = $('.currsongif-album')
const waves = $('.playlist-item-index')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs: [
        {
            name: 'Chắc Ai Đó Sẽ Về',
            singer:'MTP',
            path:'./assets/music/chacaidoseve.mp3',
            image: './assets/img/chacaidoseve.jpg',
        },
        {   
            name: 'Em Của Ngày Hôm Qua',
            singer:'MTP',
            path:'./assets/music/emcuangayhomqua.mp3',
            image: './assets/img/emcuangayhomqua.jpg',
        },
        {   
            name: 'Em Của Quá Khứ',
            singer:'Nguyen Dinh Vu',
            path:'./assets/music/emcuaquakhu.mp3',
            image: './assets/img/emcuaquakhu.jpg',
        },
        {
            name: 'Đường Tôi Trở em Về',
            singer:'Lofi ver',
            path:'./assets/music/duongtoitroemve.mp3',
            image: './assets/img/duongtoitroemve.jpg',
        },
        {
            name: 'Chuyện Hoa Sim',
            singer:'H2K',
            path:'./assets/music/chuyenhoasim.mp3',
            image: './assets/img/chuyenhoasim.jpg',
        },
        {
            name: 'Hỏi Vợ Ngoại Thành',
            singer:'Xom cua Bao',
            path:'./assets/music/hoivongoaithanh.mp3',
            image: './assets/img/hoivongoaithanh.jpg',
        },
        {
            name: 'Duyên Duyên Số Số',
            singer:'Du Uyen x Nguyen Thuong',
            path:'./assets/music/duyenduyensoso.mp3',
            image: './assets/img/duyenduyensoso.jpg',
        },
        {
            name: 'Kiss',
            singer:'Hung Kubo Remix',
            path:'./assets/music/kiss.mp3',
            image: './assets/img/kiss.jpg',
        },
        {
            name: 'Mấy Đêm Chờ Mấy Đêm',
            singer:'Nguyen Huu Kha x Dai Meo Remix',
            path:'./assets/music/maydemchomaydem.mp3',
            image: './assets/img/maydemchomaydem.jpg',
        },
        {
            name: 'Kẻ Điên Tin Vào Tình Yêu',
            singer:'Lil Zpoet, Fread D',
            path:'./assets/music/kedientinvaotinhyeu.mp3',
            image: './assets/img/kedientinvaotinhyeu.jpg',
        },
        {
            name: 'Chẳng Thể Tìm Được Em',
            singer:'PhucXp ft. Freak D',
            path:'./assets/music/changthetimduocem.mp3',
            image: './assets/img/changthetimduocem.jpg',
        },
    ],

    handleEvents: function() {
        const _this = this;
       
        // play , pause audio
        playPausewrapper.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()
               
            } else {
                audio.play()
            }
        }
        audio.onplay = function() {
            _this.isPlaying = true;
            playPauseBtn.innerText = 'pause'
            musicListPlayBtn.innerText = 'pause_circle'
        }
        audio.onpause = function() {
            _this.isPlaying = false;
            playPauseBtn.innerText = 'play_arrow'
            musicListPlayBtn.innerText = 'play_circle'
        }


        musicListPlayBtn.onclick = function() {
            playPausewrapper.click()
        }

        // xu ly thanh progress bar khi audio chay

        audio.ontimeupdate = function() {
            const songCurrentTime = this.currentTime;
            const songDurationTime = this.duration;
            const progressWid = (songCurrentTime / songDurationTime) * 100;
            progressBar.style.width = progressWid + '%';



            let currentMin = Math.floor(songCurrentTime / 60)
            let currentSec = Math.floor(songCurrentTime % 60)
            if(currentSec < 10) {
                currentSec = '0'+ currentSec;
            }
            currentElement.innerText = `${currentMin}:${currentSec}`;

            
        }
        // xu ly tua
        progressWrapper.onclick = function(e) {
            const progressWidVal = this.offsetWidth;
            const progressBarOffetsX = e.offsetX;
            const songDuration = audio.duration;
            audio.currentTime = (progressBarOffetsX / progressWidVal) * songDuration;
        }

        // xu ly thoi gian bai hat
        audio.onloadeddata = function() {
            const songCurrentTime = this.currentTime;
            const songDurationTime = this.duration;
            let durationMin = Math.floor(songDurationTime / 60)
            let durationSec = Math.floor(songDurationTime % 60)
            if(durationSec < 10) {
                durationSec = '0'+ durationSec;
            }
            durationElement.innerText = `${durationMin}:${durationSec}`;
        }

        // next bai hat
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong();
            }
            audio.play()

        }
        musicListNextBtn.onclick = function() {
            nextBtn.click();
        }

        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
            } else{
                _this.prevSong();
            }
            audio.play()

        }
        musicListPrevBtn.onclick = function() {
            prevBtn.click();
        }

        // lap bai hat
        repeatLoopBtn.onclick = function() {
            let repeatText = this.innerText;
            
            switch(repeatText) {
                case 'repeat':
                    this.innerText = 'repeat_one';
                    break;
                case 'repeat_one':
                    this.innerText = 'shuffle';
                    break;
                case 'shuffle':
                    this.innerText = 'repeat';
                    break;
            }
        }

        audio.onended = function() {
            let repeatText = repeatLoopBtn.innerText;
            switch(repeatText) {
                case 'repeat':
                    nextBtn.click();
                    break;
                case 'repeat_one':
                    this.currentTime = 0;
                    this.play()
                    break;
                case 'shuffle':
                    _this.isRandom = true;
                    _this.randomSong();
                    audio.play()
                    break;
            }

            
        }


        // show music list
        musicListBtn.onclick = function() {
            playListWrapper.classList.add('show')
        }

        closeMusicList.onclick = function() {
            playListWrapper.classList.remove('show')

        }

        musicListItem.onclick = function(e) {
            const songNode = e.target.closest('.main_playlist-item:not(.active)');
            if(songNode || e.target.closest('#option')) {
                if(songNode) {
                    let dataIndex = songNode.getAttribute('data-index');
                    _this.currentIndex = Number(dataIndex);
                    _this.loadCurrentSong()
                    _this.renderToPlayList()
                    audio.play();
                }
                if(e.target.closest('#option')) {

                }
            }
        }

       

    },

    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.renderToPlayList()
        this.loadCurrentSong()
    },

    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.renderToPlayList()
        this.loadCurrentSong()
    },

    randomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex == this.currentIndex)
        this.currentIndex = newIndex;
        this.renderToPlayList()
        this.loadCurrentSong()
    },

    loadCurrentSong: function() {
        // Load the current song to player
        quantytiSongAlbum.innerText = `Album ${this.songs.length} song 2022`
        songThumb.src = this.currentSong.image;
        songName.innerHTML = this.currentSong.name;
        songAuthor.innerHTML = this.currentSong.singer;

        //load the currentSong to play list
        songThumbPlist.src = this.currentSong.image;
        songNamePList.innerHTML = this.currentSong.name;
        songAuthorPList.innerHTML = this.currentSong.singer;

        audio.src = this.currentSong.path;
    },

    defindProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    
    renderToPlayList: function() {
        let htmlPlayList = this.songs.map(function(song, index) {
            return `
            <div class="main_playlist-item ${index === app.currentIndex ? 'active' : ''}" data-index="${index}">
                <span class="playlist-item-index">${index+1}</span>
                <div class="playlist-itemif">
                    <p class="playlist-item-name">${song.name}</p>
                    <p class="playlist-item-author">${song.singer}</p>
                </div>
                <span id="option" class="waves_container ${index === app.currentIndex  ? 'show_wave' : ''}">
                    <span class="music_waves wave1"></span>
                    <span class="music_waves wave2"></span>
                    <span class="music_waves wave3"></span>
                    <span class="music_waves wave4"></span>
                </span>
            </div>
            `
        })
        mainPlayList.innerHTML = htmlPlayList.join('\n')
    },

    start: function() {
        this.defindProperties();

        //render bai hat ra giao dien
        this.renderToPlayList()

        this.loadCurrentSong()
        
        this.handleEvents()

    }
    
}
app.start();


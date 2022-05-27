<script>
    export let title = '';
    
    const fetchImage = (async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos')
        return await response.json()
        })()

    // let shorts = [
    //     {
    //         url:"https://youtube.com/embed/Jm5s6N0R0pM",
    //         title:"This is the best first project for programmers 👩‍💻 #technology #programming #software #career"
    //     },
    //     {
    //         url:"https://youtube.com/embed/8mvNzU7DpO4",
    //         title:"If You Don’t Understand Short Circuiting Your App Will Break"
    //     },
    //     {
    //         url:"https://youtube.com/embed/AZGuWPhuyrg",
    //         title:"Terrifying Aztec Death Whistle"
    //     },
    //     {
    //         url:"https://youtube.com/embed/a_tCJbHmtKs",
    //         title:"this lamp makes you colorblind"
    //     }
    // ]
    
    let shorts = [
         {
             url:"https://www.youtube.com/embed/GNG6xdbxTfA",
             title:"Gimana Sih Kalau Polisi Dibantu Artificial Intelligence?"
         },
         {
             url:"https://www.youtube.com/embed/ItaAJjRDblM",
             title:"Kipas Angin yang Mengubah Dunia | Spill the Tech"
         }
        ]
    </script>
    
    <div class="container">
        <h4 class="title">{title}</h4>
        <div class="video">
            {#each shorts as short}
                <iframe class='youtube' src={short.url} title={short.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            {/each}
        </div>
    </div>
    
    
    <style>
        .title {
            font-family: var(--fontfamily1);
            font-weight:700;
            font-size:1.5rem;
            margin-left: 6%;
            color: #242053;
        }
        .video {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: row;
            margin: 0 auto;
        }
        .youtube {
            width:45%;
            aspect-ratio: 16/9;
        }
        .container {
            margin-bottom:2rem;
        }
        .slider-container {
            overflow-x: scroll;
            white-space: nowrap;  
        }
        .slider {
            margin-left: 6%;
            display: flex;
        }
        .news {
            margin-right:0.8rem;
            position: relative;            
        }
        .imgthumb {
            width:33.6vw;
            height:59.7vw;
            border-radius:0.5rem;
            object-fit: cover;
        }
        /* .article-title {
            font-family: var(--fontfamily2);
            font-size: 1rem;
            font-weight:00;
            color:white;
            position: absolute;
            white-space: normal;
            line-height: 1rem;
            margin: 0;
            bottom:0;
            left:0;
            padding:1rem;
            z-index: 50;
        } */
        .slider-container::-webkit-scrollbar {
            display: none;
        }
        .slider-container {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }

        @media only screen /*xtrasmall*/
        and (max-width: 575px) {
            .video {
                flex-direction: column;
                width:88%
            }
            .youtube {
                width:100%;
                margin-bottom: 1rem;
            }

        }
        @media only screen /*small*/
        and (min-width: 576px)
        and (max-width: 767px) {
            .title {
                font-size:2rem
            }
            .container {
                max-width:900px;
                width:90%;
                margin:1rem auto;
            }
            .imgthumb {
                width:20vw;
                height:40vw;
            }
            .slider {
                margin-left: 0;
            }
            .video {
                flex-direction: column;
                width:88%
            }
            .youtube {
                width:100%;
                margin-bottom: 1rem;
            }
        }
        @media only screen /*medium*/
        and (min-width: 768px)
        and (max-width: 991px) {
            .title {
                font-size:2rem
            }
            .container {
                max-width:900px;
                width:90%;
                margin:1rem auto;
            }
            .imgthumb {
                width:18vw;
                height:35vw;
            }
            .slider {
                margin-left: 0;
            }
            .video {
                flex-direction: row;
            }
            .youtube {
                width:47%;
                margin-bottom: 1rem;
            }
        }
        @media only screen /*large*/
        and (min-width: 992px)
        and (max-width: 1199px) {
            .title {
                font-size:2rem
            }
            .container {
                max-width:800px;
                width:80%;
                margin:3rem auto;
            }
            .imgthumb {
                width:18vw;
                height:35vw;
            }
            .slider {
                margin-left: 0;
            }
            .video {
                flex-direction: row;
            }
            .youtube {
                width:48%;
                margin-bottom: 1rem;
            }
        }
        @media only screen /*xtralarge*/
        and (min-width: 1200px) {
            .title {
                font-size:2rem;
                margin-left:0;
                margin-bottom:1rem;
            }
            .container {
                max-width:1100px;
                width:70.4%;
                margin:1rem auto 3rem auto;
            }
            .imgthumb {
                width:18vw;
                height:35vw;
            }
            .slider {
                margin-left: 0;
            }
            .video {
                flex-direction: row;
            }
            .youtube {
                width:49%;
                margin-bottom: 1rem;
            }
        }
    </style>
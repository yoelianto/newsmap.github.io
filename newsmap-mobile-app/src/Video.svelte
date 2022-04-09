<script>
    export let title = '';
    
    const fetchImage = (async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos')
        return await response.json()
        })()

    let shorts = [
        {
            url:"https://www.youtube.com/embed/NpmK3cW9MU4",
            title:"Why Deadpool's Skin Doesn't REGENERATE? #Shorts"
        },
        {
            url:"https://youtube.com/embed/Jm5s6N0R0pM",
            title:"This is the best first project for programmers 👩‍💻 #technology #programming #software #career"
        },
        {
            url:"https://youtube.com/embed/8mvNzU7DpO4",
            title:"If You Don’t Understand Short Circuiting Your App Will Break"
        },
        {
            url:"https://youtube.com/embed/AZGuWPhuyrg",
            title:"Terrifying Aztec Death Whistle"
        },
        {
            url:"https://youtube.com/embed/a_tCJbHmtKs",
            title:"this lamp makes you colorblind"
        }
    ]
    </script>
    
    <div class="container">
        <h4 class="title">{title}</h4>
        <div class="slider-container">
            <div class="slider">
                <!-- {#await fetchImage}
                <p>...waiting</p>
                {:then data} -->
                    {#each shorts as short}
                        <div class="news">
                            <iframe class="imgthumb" src={short.url} title={short.title} frameborder=0 allowfullscreen></iframe>
                            <!-- <p class="article-title">{short.title}</p> -->
                        </div>
                        
                    {/each}
                <!-- {:catch error}
                    <p>An error occurred!</p>
                {/await} -->
            </div>
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
                margin:1rem auto;
            }
            .imgthumb {
                width:18vw;
                height:35vw;
            }
        }
        @media only screen /*xtralarge*/
        and (min-width: 1200px) {
            .title {
                font-size:2rem
            }
            .container {
                max-width:1100px;
                width:80%;
                margin:1rem auto 0 auto;
            }
            .imgthumb {
                width:18vw;
                height:35vw;
            }
        }
    </style>
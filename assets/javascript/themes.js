 // GLOBALS:global variables
// TODO: Implement multiple, user-selectable themes

// For the mutli-themed functionality, create an array of theme objects.
// This version uses only one theme. 

var themes = [
  
    theme1 = {
      themeName    : 'Eighties Music Artists',
      imageFileName: "80smusic.jpg",  
      themeWords   : [ {
                         name: "default",
                         imageFile : "assets/images/80s.jpg",
                         textInfo : "The 1980s saw the emergence of dance music and new wave. As disco fell out of fashion in the decade's early years, genres such as post-disco, Italo disco, Euro disco and dance-pop became more popular. Rock music continued to enjoy a wide audience.     Soft rock, glam metal, thrash metal, shred guitar characterized by heavy distortion, pinch harmonics and whammy bar abuse became very popular.  Adult contemporary, quiet storm, and smooth jazz gained popularity.     In the late 1980s, glam metal became the largest, most commercially successful brand of music in the United States and worldwide."
                       },
                       {
                         name: "Madonna",
                         imageFile : "assets/images/madonna.png",
                         textInfo : "Madonna Louise Ciccone, born August 16, 1958) is an American singer, songwriter, actress, and businesswoman. Referred to as the 'Queen of Pop' since the 1980s, Madonna is known for pushing the boundaries of songwriting in mainstream popular music and for the imagery she uses onstage and in music videos. She has frequently reinvented her music and image while maintaining autonomy within the recording industry. Although having sparked controversy, her works have been praised by music critics. Madonna is often cited as an influence by other artists."
                       },
                       {          
                        name: "Cyndi Lauper",
                        imageFile : "assets/images/cyndilauper.jpg",
                        textInfo : "Cynthia Ann Stephanie Lauper (usually Cyndi; born June 22, 1953) is an American singer, songwriter, actress and activist. Her career has spanned over 40 years.  Her album She's So Unusual (1983) was the first debut album by a female artist to achieve four top-five hits on the Billboard Hot 100—'Girls Just Want to Have Fun', 'Time After Time', 'She Bop', and 'All Through the Night'—and earned Lauper the Best New Artist award at the 27th Grammy Awards in 1985. Her success continued with the soundtrack for the motion picture The Goonies and her second record True Colors (1986). This album included the number one single 'True Colors' and 'Change of Heart', which peaked at number three."
                       },
                       {          
                        name: "Bon-Jovi",
                        imageFile : "assets/images/bonjovi.jpg",
                        textInfo : "Bon Jovi is an American rock band formed in 1983 in Sayreville, New Jersey. It consists of singer Jon Bon Jovi, keyboardist David Bryan, drummer Tico Torres, guitarist Phil X, and bassist Hugh McDonald. Previous bassist Alec John Such was dismissed in 1994, and longtime guitarist and co-songwriter Richie Sambora left in 2013."
                       }, 
                       {          
                        name: "R.E.M.",
                        imageFile : "assets/images/rem.jpg",
                        textInfo : "R.E.M. was an American rock band from Athens, Georgia, formed in 1980 by drummer Bill Berry, guitarist Peter Buck, bassist/backing vocalist Mike Mills, and lead vocalist Michael Stipe. One of the first alternative rock bands, R.E.M. was noted for Buck's ringing, arpeggiated guitar style, Stipe's distinctive vocal quality and obscure lyrics, Mills's melodic basslines and backing vocals, and Berry's tight, economical style of drumming."
                       },
                       {          
                        name: "Bruce Springsteen",
                        imageFile : "assets/images/bruce.jpg",
                        textInfo : "Bruce Frederick Joseph Springsteen (born September 23, 1949), nicknamed 'The Boss', is an American singer-songwriter and leader of the E Street Band. He is recognized for his poetic lyrics, his Jersey Shore roots, his distinctive voice, and his lengthy, energetic stage performances."
                       },
                       {          
                        name: "Journey",
                        imageFile : "assets/images/journey.jpg",
                        textInfo : "Journey is an American rock band that formed in San Francisco in 1973, composed of former members of Santana and Frumious Bandersnatch. The band has gone through several phases; its strongest commercial success occurred between 1978 and 1987 when Steve Perry was lead vocalist. During that period, the band released a series of hit songs, including 'Don't Stop Believin' (1981), which in 2009 became the top-selling track in iTunes history among songs not released in the 21st century."
                       },
                       {          
                        name: "Pink Floyd",
                        imageFile : "assets/images/pinkfloyd.jpg",
                        textInfo : "Pink Floyd were an English rock band formed in London in 1965. They achieved international acclaim with their progressive and psychedelic music. Distinguished by their philosophical lyrics, sonic experimentation, extended compositions, and elaborate live shows, they are one of the most commercially successful and influential groups in popular music history."
                       }, 
                       {
                           name: "Duran Duran",
                           imageFile: "assets/images/duranduran.jpg",
                           textInfo : "Duran Duran are an English new wave band formed in Birmingham in 1978. The band were one of the most successful acts of the 1980s, but by the end of the decade, membership and music style changes challenged the band before a resurgence in the early 1990s. The group were a leading band in the MTV-driven Second British Invasion of the US in the 1980s. They achieved 14 singles in the top 10 of the UK Singles Chart and 21 in the US Billboard Hot 100, and have sold over 100 million records worldwide."
                       },
                       {
                        name: "Van Halen",
                        imageFile: "assets/images/vanhalen.jpg",
                        textInfo : "Van Halen is an American hard rock band formed in Pasadena, California in 1972. Credited with 'restoring hard rock to the forefront of the music scene', Van Halen is known for its energetic live shows and for the work of its acclaimed lead guitarist, Eddie Van Halen. The band was inducted into the Rock and Roll Hall of Fame in 2007."
                       },
                       {
                        name: "Michael Jackson",
                        imageFile: "assets/images/mjackson.jpg",
                        textInfo : "Michael Joseph Jackson (August 29, 1958 – June 25, 2009) was an American singer, songwriter, and dancer. Dubbed the 'King of Pop', he is regarded as one of the most significant cultural figures of the 20th century and one of the greatest entertainers. Jackson's contributions to music, dance, and fashion, along with his publicized personal life, made him a global figure in popular culture for over four decades."
                       },
                       {
                        name: "Guns and Roses",
                        imageFile: "assets/images/gandr.jpg",
                        textInfo : "Guns N' Roses, often abbreviated as GNR, is an American hard rock band from Los Angeles, California, formed in 1985. When they signed to Geffen Records in 1986, the band comprised vocalist Axl Rose, lead guitarist Slash, rhythm guitarist Izzy Stradlin, bassist Duff McKagan, and drummer Steven Adler. The current lineup consists of Rose, Slash, McKagan, keyboardist Dizzy Reed, guitarist Richard Fortus, drummer Frank Ferrer and keyboardist Melissa Reese."
                       },
                       {
                        name: "Metallica",
                        imageFile: "assets/images/metallica.jpg",
                        textInfo : "Metallica is an American heavy metal band. The band was formed in 1981 in Los Angeles, California, by drummer Lars Ulrich and vocalist/guitarist James Hetfield, and has been based in San Francisco, California for most of its career. The group's fast tempos, instrumentals and aggressive musicianship made them one of the founding 'big four' bands of thrash metal, alongside Megadeth, Anthrax and Slayer. Metallica's current lineup comprises founding members Hetfield and Ulrich, longtime lead guitarist Kirk Hammett and bassist Robert Trujillo. Guitarist Dave Mustaine (who went on to form Megadeth) and bassists Ron McGovney, Cliff Burton and Jason Newsted are former members of the band."
                       }
                     ]
    },

    theme2 = {
      themeName    : 'American Cities',
      imagefileName: 'americancities.jpg',
      themeWords   : ['New York', 'Los Angeles' , 'San Francisco', 'Houston', 'Miami', 'Orlando', 'Seattle', 'Detroit', 'Fargo', 'Chicago']
    }
]
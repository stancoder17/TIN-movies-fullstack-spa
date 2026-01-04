DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS movies;

CREATE TABLE users
(
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname            VARCHAR(50) NOT NULL,
    email               VARCHAR(100) NOT NULL UNIQUE,
    password_hash       CHAR(64) NOT NULL,
    profile_picture_url VARCHAR(255) DEFAULT 'https://i.pinimg.com/474x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg?nii=t' NOT NULL,
    date_of_birth       DATE NOT NULL,
    date_of_joining     DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    bio                 TEXT
);

CREATE TABLE movies
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    title        VARCHAR(255) NOT NULL,
    description  TEXT NOT NULL,
    genre        VARCHAR(100) NOT NULL,
    director     VARCHAR(100) NOT NULL,
    release_date DATE NOT NULL,
    runtime      INT NOT NULL,
    poster_url   VARCHAR(500) NOT NULL,
    youtube_html_url  VARCHAR(500) NOT NULL
);

CREATE TABLE ratings
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INT NOT NULL,
    movie_id   INT NOT NULL,
    score      DECIMAL(3, 1) NOT NULL CHECK (score >= 1.0 AND score <= 10.0),
    comment    TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    edited BOOL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE,
    UNIQUE (user_id, movie_id)
);


INSERT INTO users (nickname, email, password_hash, profile_picture_url, date_of_birth, date_of_joining, bio)
VALUES
    ('admin','king@example.com','0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e','https://cdn.pfps.gg/pfps/9319-lego-star-wars-31.png', '1992-05-12', '2023-06-12', 'Movies are very cool, yes, very cool indeed.'),
    ('SaraHJ','sarah.j@example.com', '6cf615d5bcaac778352a8f1f3360d23f02f34ec182e259897fd6ce485d7870d4',  'https://pics.craiyon.com/2023-10-27/51bd27e80c554b11af16a1660230a762.webp', '1998-11-23', '2024-10-03', 'Film studies student and thus coffee addict.'),
    ('TheGrumpyCritic', 'critical.mark@example.com',  '5906ac361a137e2d286465cd6588ebb5ac3f5ae955001100bc41577c3d751764', 'https://cdn.pfps.gg/pfps/9038-funny-star-wars.png', '1985-03-30', '2020-01-20','Movies are the best, but most blockbusters are overrated'),
    ('xX_MovieLover_Xx', 'jessica.k@example.com','b97873a40f73abedd8d685a7cd5e5f85e4a9cfb83eac26886640a0813850122b','https://preview.redd.it/monke-image-dump-19-v0-lgarrkehrnsa1.jpg?width=1280&format=pjpg&auto=webp&s=9369c4fee3f03b9ad7a36ed6b73e1b70c1649b9f','2003-07-15', '2025-09-23', 'Here for a good time! I love Star Wars, no-brainers and popcorn. Dont ask me about plot holes lol.'),
    ('NeoWarsaw','neo.w@example.com','c2a6b1f0b8e34d4b4f2a6cdb38fbe2c5fbbdce51fa0d0a2e6c6c0c1cce3a1e21','https://tse4.mm.bing.net/th/id/OIP.YqRl-HUQCHEbvXOqC8SUugHaEK?rs=1&pid=ImgDetMain&o=7&rm=3','1995-02-01','2022-04-18','Cyberpunk aesthetics, sci-fi philosophy and good sound design.'),
    ('SlowCinema','slow.cinema@example.com','9a1f4c0b2f84a1f8b0a56f0a6c77a5e3a5c8c1b74c4b5d8f1bfa6a9a2e7d1a0c','https://th.bing.com/th/id/R.3b585281e1bacc2c8d0e87d7aaa7afde?rik=sVQFdDKm4FfWOg&pid=ImgRaw&r=0','1989-09-09','2021-11-02','Long takes, minimal dialogue, maximum mood.'),
    ('FrameByFrame','fbf.editor@example.com','4d91f1c6c8a7e2b93d0f56a9b2c4f8e1c9b5f6d3a1e2c4b6d8e9f0a1b2c3','https://tse3.mm.bing.net/th/id/OIP.QcLdFHdoI2JA3MN7FCAvRwHaFB?rs=1&pid=ImgDetMain&o=7&rm=3','1993-06-17','2023-08-29','Editor by trade, nitpicking cuts and continuity.'),
    ('GenreJunkie','genres@example.com','1f8c9a6b7d2e3c4b5a9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0','https://i.ytimg.com/vi/wNnu2IYCcrw/maxresdefault.jpg','2000-12-04','2024-01-11','If it has a genre tag, I watched it. Twice.'),
    ('AnalogFan','analog.rules@example.com','7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f','https://i.redd.it/mvqb290ypfs31.jpg','1982-04-22','2019-05-07','Film grain over pixels. Always.'),
    ('LateNightViewer','lnv@example.com','e1f2d3c4b5a697887766554433221100ffeeddccbbaa998877665544332211','https://tse4.mm.bing.net/th/id/OIP.7HzEuOnuzqeAyzvNfPJ07wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3','1997-10-31','2022-12-19','Best movies hit hardest after midnight.'),
    ('tomato','tomaytoe@example.com','5ed728c2fa5d767bc6c1ec6a732db1e37c343be46913e6498d340f7782691f14','https://tse3.mm.bing.net/th/id/OIP.RhcqsqEGS3B3NfnjP3ktJgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3','1967-10-06','2020-01-05','');

INSERT INTO movies (title, description, genre, director, release_date, runtime, poster_url, youtube_html_url)
VALUES
    ('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 'sci-fi', 'Christopher Nolan', '2010-07-16', 148, 'https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg', 'https://www.youtube.com/embed/YoHD9XEInc0'),
    ('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'drama', 'Frank Darabont', '1994-09-22', 142, 'https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', 'https://www.youtube.com/embed/PLl99DlL6b4'),
    ('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'crime', 'Francis Ford Coppola', '1972-03-24', 175, 'https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', 'https://www.youtube.com/embed/UaVTIH8mujA'),
    ('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'crime', 'Quentin Tarantino', '1994-10-14', 154, 'https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', 'https://www.youtube.com/embed/s7EdQ4FqbhY'),
    ('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 'action', 'Christopher Nolan', '2008-07-18', 152, 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'https://www.youtube.com/embed/EXeTwQWrcwY'),
    ('Forrest Gump', 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75.', 'drama', 'Robert Zemeckis', '1994-07-06', 142, 'https://image.tmdb.org/t/p/original/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', 'https://www.youtube.com/embed/bLvqoHBptjg'),
    ('Fight Club', 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.', 'drama', 'David Fincher', '1999-10-15', 139, 'https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 'https://www.youtube.com/embed/qtRKdVHc-cE'),
    ('The Matrix', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', 'sci-fi', 'Lana Wachowski, Lilly Wachowski', '1999-03-31', 136, 'https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', 'https://www.youtube.com/embed/vKQi3bBA1y8'),
    ('Interstellar', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.', 'sci-fi', 'Christopher Nolan', '2014-11-07', 169, 'https://tse2.mm.bing.net/th/id/OIP.uiaj_IMaC7h3NoieAhcmVwHaLG?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', 'https://www.youtube.com/embed/zSWdZVtXT7E'),
    ('Parasite', 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', 'thriller', 'Bong Joon Ho', '2019-05-30', 132, 'https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', 'https://www.youtube.com/embed/5xH0HfJHsaY'),
    ('Blade Runner 2049','Young Blade Runner K''s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.','sci-fi','Denis Villeneuve','2017-10-06',164,'https://image.tmdb.org/t/p/original/aMpyrCizvSdc0UIMblJ1srVgAEF.jpg','https://www.youtube.com/embed/gCcx85zbxz4'),
    ('No Country for Old Men','Violence and chaos follow when a hunter stumbles upon a drug deal gone wrong and takes the cash.','thriller','Joel Coen, Ethan Coen','2007-11-21',122,'https://image.tmdb.org/t/p/original/6d5XOczc226jECq0LIX0siKtgHR.jpg','https://www.youtube.com/embed/38A__WT3-o0'),
    ('Whiplash','A promising young drummer enrolls at a cut-throat music conservatory.','drama','Damien Chazelle','2014-10-10',107,'https://media.port.hu/images/000/714/141.jpg','https://www.youtube.com/embed/7d_jQycdQGo'),
    ('Her','In the near future, a lonely writer develops an unlikely relationship with an operating system.','romance','Spike Jonze','2013-12-18',126,'https://image.tmdb.org/t/p/original/eCOtqtfvn7mxGl6nfmq4b1exJRc.jpg','https://www.youtube.com/embed/WzV6mXIOVl4'),
    ('There Will Be Blood','A story of family, religion, hatred, oil and madness.','drama','Paul Thomas Anderson','2007-12-26',158,'https://m.media-amazon.com/images/I/712hOZ1UCmL.jpg','https://www.youtube.com/embed/FeSLPELpMeM'),
    ('Arrival','A linguist works with the military to communicate with alien lifeforms.','sci-fi','Denis Villeneuve','2016-11-11',116,'https://image.tmdb.org/t/p/original/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg','https://www.youtube.com/embed/tFMo3UJ4B4g'),
    ('Oldboy','After being kidnapped and imprisoned for years, a man seeks revenge.','thriller','Park Chan-wook','2003-11-21',120,'https://www.themoviedb.org/t/p/original/idBaREsAGTjPZPrlAd1w8SVzUzd.jpg','https://www.youtube.com/embed/2HkjrJ6IK5E');

INSERT INTO ratings (user_id, movie_id, score, comment)
VALUES
    (1, 1, 10, 'Nolan''s absolute masterpiece. The practical effects in the hallway scene still blow my mind. Zimmer''s score is legendary.'),
    (1, 8, 9, 'Changed action movies forever. The CGI aged a bit, but the style and philosophy are timeless. A must-watch.'),
    (1, 9, 8, 'Visually stunning, probably the best space movie since 2001: A Space Odyssey. The ending was a bit too abstract for me though.'),

    (2, 2, 10, 'The most beautiful story about hope and friendship. I cry every single time I watch the ending.'),
    (2, 6, 9, 'Tom Hanks at his peak. It feels like watching American history in a nutshell. "Run, Forrest, run!"'),
    (2, 4, 8, 'Tarantino''s dialogue is unmatched, honestly. But I had to look away during a few scenes, the violence is a bit excessive.'),

    (3, 5, 7, 'Solid film, but let''s be honest - the Joker performance carries the entire movie. The script has some major pacing issues in the third act.'),
    (3, 10, 9, 'Finally, something fresh. Korean cinema showing Hollywood how it''s done. The social commentary is brilliant.'),
    (3, 7, 6, 'Style over substance. It tries too hard to be edgy and philosophical. Maybe I''m just too old for this.'),

    (4, 1, 8, 'I didnt understand half of it lol but it looked cool. Leo is great as always!'),
    (4, 5, 10, 'BATMAN IS THE GOAT!! Best superhero movie ever made, hands down. RIP Heath Ledger.'),
    (4, 3, 5, 'way too long and boring. Nothing happens for like an hour. Fell asleep halfway through.'),

    (5, 11, 10, 'A rare sequel that surpasses the original. Hypnotic visuals and a crushing sense of melancholy.'),
    (6, 15, 9, 'Pure obsession on screen. The editing and sound design are borderline stressful, in a good way.'),
    (7, 16, 8, 'Smart sci-fi that trusts the viewer. The linguistics angle is surprisingly emotional.'),
    (8, 12, 9, 'Cold, brutal, and perfectly paced. No music, no mercy.'),
    (9, 14, 8, 'Quiet, intimate and painfully relatable. Joaquin Phoenix carries every frame.'),
    (10, 13, 10, 'Daniel Day-Lewis delivers one of the greatest performances ever captured on film.'),
    (5, 17, 9, 'Disturbing and unforgettable. Revenge taken to its absolute extreme.'),

    (5, 8, 9, 'Rewatched after years and it still hits hard. The bullet-time scenes are iconic for a reason.'),
    (6, 11, 8, 'Slow, atmospheric sci-fi done right. Villeneuve understands scale and silence.'),
    (7, 4, 7, 'Brilliantly written, but the nonlinear structure feels more gimmicky on repeat viewings.'),
    (8, 15, 9, 'Relentless intensity. J.K. Simmons is terrifying without ever raising his voice.'),
    (9, 2, 7, 'Beautiful concept and strong performances, but it drags slightly in the middle.'),
    (10, 12, 8, 'Minimalist and brutal. Every decision feels final and irreversible.'),
    (11, 16, 9, 'Emotionally devastating sci-fi. The final reveal completely reframes the story.'),
    (5, 6, 8, 'Simple story, perfectly executed. Hanks makes it feel effortless.'),
    (6, 17, 10, 'One of the most disturbing films I have ever seen, but technically flawless.'),
    (7, 5, 9, 'Still the gold standard for superhero films. The tension never lets up.');



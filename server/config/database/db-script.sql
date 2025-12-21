DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS movies;

CREATE TABLE users
(
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname            VARCHAR(50)                        NOT NULL,
    email               VARCHAR(100)                       NOT NULL UNIQUE,
    password_hash       CHAR(64)                           NOT NULL,
    profile_picture_url VARCHAR(255),
    date_of_birth       DATE                               NOT NULL,
    date_of_joining     DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    bio                 TEXT
);

CREATE TABLE movies
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    title        VARCHAR(255) NOT NULL,
    description  TEXT         NOT NULL,
    genre        VARCHAR(100) NOT NULL,
    director     VARCHAR(100) NOT NULL,
    release_date DATE         NOT NULL,
    runtime      INT          NOT NULL,
    poster_url   VARCHAR(500) NOT NULL
);

CREATE TABLE ratings
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INT                                NOT NULL,
    movie_id   INT                                NOT NULL,
    score      DECIMAL(3, 1)                      NOT NULL CHECK (score >= 1.0 AND score <= 10.0),
    comment    TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE,
    UNIQUE (user_id, movie_id)
);



INSERT INTO users (nickname, email, password_hash, profile_picture_url, date_of_birth, date_of_joining, bio)
VALUES
        ('dave_the_cinephile','dave.movies@example.com','0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e','https://cdn.pfps.gg/pfps/9319-lego-star-wars-31.png', '1992-05-12', '2023-06-12', 'Cinema is not just entertainment, it is a way of life. sci-fi geek and vinyl collector. Letterboxd veteran.'),
        ('SaraHJ','sarah.j@example.com', '6cf615d5bcaac778352a8f1f3360d23f02f34ec182e259897fd6ce485d7870d4',  'https://pics.craiyon.com/2023-10-27/51bd27e80c554b11af16a1660230a762.webp', '1998-11-23', '2024-10-03', 'Film studies student and thus coffee addict.'),
        ('TheGrumpyCritic', 'critical.mark@example.com',  '5906ac361a137e2d286465cd6588ebb5ac3f5ae955001100bc41577c3d751764', 'https://cdn.pfps.gg/pfps/9038-funny-star-wars.png', '1985-03-30', '2020-01-20','Movies are the best, but most blockbusters are overrated'),
        ('xX_MovieLover_Xx', 'jessica.k@example.com','b97873a40f73abedd8d685a7cd5e5f85e4a9cfb83eac26886640a0813850122b','https://preview.redd.it/monke-image-dump-19-v0-lgarrkehrnsa1.jpg?width=1280&format=pjpg&auto=webp&s=9369c4fee3f03b9ad7a36ed6b73e1b70c1649b9f','2003-07-15', '2025-09-23', 'Here for a good time! I love Star Wars, no-brainers and popcorn. Dont ask me about plot holes lol.');


INSERT INTO movies (title, description, genre, director, release_date, runtime, poster_url)
VALUES
        ('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 'sci-fi', 'Christopher Nolan', '2010-07-16', 148, 'https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg'),('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'drama', 'Frank Darabont', '1994-09-22', 142, 'https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg'),
        ('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'crime', 'Francis Ford Coppola', '1972-03-24', 175, 'https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'),
        ('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'crime', 'Quentin Tarantino', '1994-10-14', 154, 'https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'),
        ('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 'action', 'Christopher Nolan', '2008-07-18', 152, 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg'),
        ('Forrest Gump', 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75.', 'drama', 'Robert Zemeckis', '1994-07-06', 142, 'https://image.tmdb.org/t/p/original/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'),
        ('Fight Club', 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.', 'drama', 'David Fincher', '1999-10-15', 139, 'https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'),
        ('The Matrix', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', 'sci-fi', 'Lana Wachowski, Lilly Wachowski', '1999-03-31', 136, 'https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'),
        ('Interstellar', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.', 'sci-fi', 'Christopher Nolan', '2014-11-07', 169, 'https://tse2.mm.bing.net/th/id/OIP.uiaj_IMaC7h3NoieAhcmVwHaLG?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3'),
        ('Parasite', 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', 'thriller', 'Bong Joon Ho', '2019-05-30', 132, 'https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg');


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
        (4, 3, 5, 'way too long and boring. Nothing happens for like an hour. Fell asleep halfway through.');



const books = [
  {
    "title": "War and Peace",
    "author": "Leo Tolstoy",
    "genre": "Historical Fiction, Classics",
    "description": "A sweeping narrative that intertwines the lives of several families during the Napoleonic Wars, exploring themes of fate, free will, and the nature of history.",
    "year": 1869,
    "ISBN": "123456789",
    "pages": 1225,
    "language": "Russian",
    "image": "/images/war-and-peace.jpg",
    "price": 30.50,
    "binding": "Hardcover",
    "publisher": "Classic Literature Press"
  },
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "genre": "Southern Gothic",
    "description": "A profound and poignant exploration of racial injustice in the Deep South, narrated through the innocent eyes of a young girl named Scout Finch.",
    "year": 1960,
    "ISBN": "1122334455",
    "pages": 281,
    "language": "English",
    "image": "/images/to-kill-a-mockingbird.jpg",
    "price": 10,
    "binding": "Paperback",
    "publisher": "Fictional Publishing House"
  },
  {
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "genre": "Romantic Fiction",
    "description": "A classic tale of love and social standing, focusing on the spirited Elizabeth Bennet as she navigates issues of morality, education, and marriage in early 19th-century England.",
    "year": 1813,
    "ISBN": "9988776655",
    "pages": 432,
    "language": "English",
    "image": "/images/pride-and-prejudice.jpg",
    "price": 8.50,
    "binding": "Paperback",
    "publisher": "Vintage Books"
  },
  {
    "title": "Moby-Dick",
    "author": "Herman Melville",
    "genre": "Adventure Fiction",
    "description": "An epic tale of obsession and revenge, following Captain Ahab's relentless pursuit of the great white whale, Moby Dick, exploring deep philosophical questions about existence.",
    "year": 1851,
    "ISBN": "7766554433",
    "pages": 635,
    "language": "English",
    "image": "/images/moby-dick.jpg",
    "price": 25,
    "binding": "Hardcover",
    "publisher": "Classic Reads Co."
  },
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Tragedy",
    "description": "A tragic exploration of the American Dream, following the mysterious Jay Gatsby and his obsessive love for Daisy Buchanan against the backdrop of the Roaring Twenties.",
    "year": 1925,
    "ISBN": "5544332211",
    "pages": 180,
    "language": "English",
    "image": "/images/the-great-gatsby.jpg",
    "price": 15.80,
    "binding": "Paperback",
    "publisher": "Whale Tales Publishing"
  },
  {
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "genre": "Literary Realism, Classics",
    "description": "A novel capturing the teenage angst and alienation of Holden Caulfield, who struggles to find his place in a world he perceives as phony.",
    "year": 1951,
    "ISBN": "3344556677",
    "pages": 214,
    "language": "English",
    "image": "/images/the-catcher-in-the-rye.jpg",
    "price": 5.50,
    "binding": "Paperback",
    "publisher": "Dreamscape Books"
  },
  {
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian, Political Fiction",
    "description": "A harrowing tale set in a totalitarian regime, where surveillance, censorship, and manipulation are the norms, as protagonist Winston Smith seeks truth and freedom.",
    "year": 1949,
    "ISBN": "9780451524935",
    "pages": 328,
    "language": "English",
    "image": "/images/1984.jpg",
    "price": 6.99,
    "binding": "Paperback",
    "publisher": "Big Brother Books"
  },
  {
    "title": "Brave New World",
    "author": "Aldous Huxley",
    "genre": "Dystopian, Science Fiction",
    "description": "A thought-provoking exploration of a future society driven by technology and consumerism, where individuality is sacrificed for stability and happiness.",
    "year": 1932,
    "ISBN": "9780060850524",
    "pages": 268,
    "language": "English",
    "image": "/images/brave-new-world.jpg",
    "price": 8.50,
    "binding": "Paperback",
    "publisher": "Future Books Inc."
  },
  {
    "title": "Crime and Punishment",
    "author": "Fyodor Dostoevsky",
    "genre": "Philosophical Fiction, Psychological Fiction, Classics",
    "description": "A deep psychological exploration of morality and redemption, following Raskolnikov, a former student who commits murder and grapples with his conscience.",
    "year": 1866,
    "ISBN": "9780486415871",
    "pages": 430,
    "language": "English",
    "image": "/images/crime-and-punishment.jpg",
    "price": 7.49,
    "binding": "Paperback",
    "publisher": "Regency Books Publishing"
  },
  {
    "title": "The Odyssey",
    "author": "Homer",
    "genre": "Epic Poetry, Mythology",
    "description": "An epic poem that narrates the journey of Odysseus as he seeks to return home after the Trojan War, encountering various mythical creatures along the way.",
    "year": -800,
    "ISBN": "9780140268867",
    "pages": 541,
    "language": "English",
    "image": "/images/the-odyssey.jpg",
    "price": 8.99,
    "binding": "Paperback",
    "publisher": "Regency Books Publishing"
  },
  {
    "title": "Wuthering Heights",
    "author": "Emily Brontë",
    "genre": "Gothic Fiction, Tragedy",
    "description": "A passionate and tragic love story set on the Yorkshire moors, exploring themes of revenge and the destructive nature of love.",
    "year": 1847,
    "ISBN": "9780141439556",
    "pages": 416,
    "language": "English",
    "image": "/images/wuthering-heights.jpg",
    "price": 5.99,
    "binding": "Paperback",
    "publisher": "Classic Literature Press"
  },
  {
    "title": "Jane Eyre",
    "author": "Charlotte Brontë",
    "genre": "Gothic Fiction, Romance",
    "description": "A coming-of-age story that follows Jane Eyre, an orphaned girl who overcomes hardship and seeks love and independence in Victorian England.",
    "year": 1847,
    "ISBN": "9780141441146",
    "pages": 532,
    "language": "English",
    "image": "/images/jane-eyre.jpg",
    "price": 6.99,
    "binding": "Paperback",
    "publisher": "Vintage Books"
  },
  {
    "title": "Catch-22",
    "author": "Joseph Heller",
    "genre": "Satire, War Fiction, Classics",
    "description": "A satirical novel set during World War II, chronicling the absurdities of war and the concept of 'Catch-22,' a no-win situation faced by soldiers.",
    "year": 1961,
    "ISBN": "9781451626650",
    "pages": 453,
    "language": "English",
    "image": "/images/catch-22.jpg",
    "price": 8.99,
    "binding": "Paperback",
    "publisher": "Vintage Books"
  },
  {
    "title": "Frankenstein",
    "author": "Mary Shelley",
    "genre": "Gothic Fiction, Science Fiction, Classics",
    "description": "The story of Victor Frankenstein, who creates a sentient creature in a scientific experiment gone wrong, exploring themes of creation, ambition, and isolation.",
    "year": 1818,
    "ISBN": "9780486282114",
    "pages": 166,
    "language": "English",
    "image": "/images/frankenstein.jpeg",
    "price": 4.50,
    "binding": "Paperback",
    "publisher": "Regency Books Publishing"
  },
  {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy, Adventure",
    "description": "A delightful adventure following hobbit Bilbo Baggins as he embarks on a quest with a group of dwarves to reclaim treasure guarded by the dragon Smaug.",
    "year": 1937,
    "ISBN": "9780547928227",
    "pages": 310,
    "language": "English",
    "image": "/images/the-hobbit.jpg",
    "price": 8.50,
    "binding": "Paperback",
    "publisher": "Fantasy Books Inc."
  },
  {
    "title": "Fahrenheit 451",
    "author": "Ray Bradbury",
    "genre": "Dystopian, Science Fiction",
    "description": "A dystopian narrative about a future society where books are banned, exploring themes of censorship and the power of knowledge.",
    "year": 1953,
    "ISBN": "9781451673319",
    "pages": 194,
    "language": "English",
    "image": "/images/fahrenheit-451.jpg",
    "price": 7.99,
    "binding": "Paperback",
    "publisher": "Future Books Inc."
  },
  {
    "title": "The Picture of Dorian Gray",
    "author": "Oscar Wilde",
    "genre": "Philosophical Fiction, Gothic Fiction",
    "description": "The story of Dorian Gray, who remains eternally young while his portrait ages, exploring themes of vanity, moral corruption, and the nature of beauty.",
    "year": 1890,
    "ISBN": "9780141439570",
    "pages": 254,
    "language": "English",
    "image": "/images/the-picture-of-dorian-gray.jpg",
    "price": 6.50,
    "binding": "Paperback",
    "publisher": "Vintage Books"
  },
  {
    "title": "Dracula",
    "author": "Bram Stoker",
    "genre": "Gothic Fiction, Horror, Classics",
    "description": "A classic horror novel that tells the story of Count Dracula's attempt to move from Transylvania to England, exploring themes of fear, desire, and the clash of modernity with superstition.",
    "year": 1897,
    "ISBN": "9780486411095",
    "pages": 418,
    "language": "English",
    "image": "/images/dracula.jpeg",
    "price": 5.99,
    "binding": "Paperback",
    "publisher": "Classic Literature Press"
  },
  {
    "title": "The Brothers Karamazov",
    "author": "Fyodor Dostoevsky",
    "genre": "Philosophical Fiction, Tragedy, Classics",
    "description": "A complex exploration of faith, doubt, and morality, focusing on the lives of the Karamazov brothers and their father’s murder.",
    "year": 1880,
    "ISBN": "9780374528379",
    "pages": 796,
    "language": "English",
    "image": "/images/the-brothers-karamazov.jpg",
    "price": 9.99,
    "binding": "Paperback",
    "publisher": "Classic Literature Publishing"
  },
  {
    "title": "The Divine Comedy",
    "author": "Dante Alighieri",
    "genre": "Epic Poetry, Religious Allegory",
    "description": "An epic poem depicting the journey of Dante through Hell, Purgatory, and Heaven, exploring themes of redemption and the human soul.",
    "year": 1320,
    "ISBN": "9780142437224",
    "pages": 798,
    "language": "English",
    "image": "/images/the-divine-comedy.jpeg",
    "price": 11.99,
    "binding": "Hardcover",
    "publisher": "Medieval Classics Publishing"
  },
  {
    "title": "The Scarlet Letter",
    "author": "Nathaniel Hawthorne",
    "genre": "Historical Fiction, Romanticism",
    "description": "Set in Puritan New England, this novel tells the story of Hester Prynne, who bears the burden of an illegitimate child and grapples with sin and redemption.",
    "year": 1850,
    "ISBN": "9780142437262",
    "pages": 272,
    "language": "English",
    "image": "/images/the-scarlet-letter.jpeg",
    "price": 5.75,
    "binding": "Paperback",
    "publisher": "Vintage Books"
  },
  {
    "title": "The Little Mermaid",
    "author": "Hans Christian Andersen",
    "genre": "Books for Children",
    "description": "A young mermaid makes a dangerous bargain with a sea witch to become human and win the love of a prince.",
    "year": 1837,
    "ISBN": "9781402780071",
    "pages": 32,
    "language": "English",
    "image": "/images/the-little-mermaid.jpg",
    "price": 6.99,
    "binding": "Hardcover",
    "publisher": "Fairy Tale Books"
  },
  {
    "title": "The Ugly Duckling",
    "author": "Hans Christian Andersen",
    "genre": "Books for Children",
    "description": "A story of an outcast duckling who eventually grows into a beautiful swan.",
    "year": 1843,
    "ISBN": "9781848691880",
    "pages": 36,
    "language": "English",
    "image": "/images/the-ugly-duckling.jpg",
    "price": 5.99,
    "binding": "Paperback",
    "publisher": "Fairy Tale Books"
  },
  {
    "title": "Cinderella",
    "author": "Charles Perrault",
    "genre": "Books for Children",
    "description": "A kind young girl, mistreated by her stepfamily, attends a royal ball with the help of her fairy godmother.",
    "year": 1697,
    "ISBN": "9780064436946",
    "pages": 40,
    "language": "English",
    "image": "/images/cinderella.jpg",
    "price": 7.99,
    "binding": "Hardcover",
    "publisher": "Fairy Tale Books"
  },
  {
    "title": "Sleeping Beauty",
    "author": "Charles Perrault",
    "genre": "Books for Children",
    "description": "A princess cursed by an evil fairy falls into a deep sleep, only to be awakened by true love’s kiss.",
    "year": 1697,
    "ISBN": "9781442413901",
    "pages": 48,
    "language": "English",
    "image": "/images/sleeping-beauty.jpg",
    "price": 6.99,
    "binding": "Hardcover",
    "publisher": "Fairy Tale Books"
  },
  {
    "title": "Karlsson on the Roof",
    "author": "Astrid Lindgren",
    "genre": "Books for Children",
    "description": "The story of a little boy named Lillebror and his friendship with Karlsson, a mischievous man who lives on the roof.",
    "year": 1955,
    "ISBN": "9780192734597",
    "pages": 160,
    "language": "English",
    "image": "/images/karlsson-on-the-roof.jpg",
    "price": 8.99,
    "binding": "Paperback",
    "publisher": "Fairy Tale Books"
  },
  {
    "title": "Pippi Longstocking",
    "author": "Astrid Lindgren",
    "genre": "Books for Children",
    "description": "Pippi, an adventurous and independent girl, lives alone with her pet monkey and horse, and often confounds adults.",
    "year": 1945,
    "ISBN": "9780140309577",
    "pages": 160,
    "language": "English",
    "image": "/images/pippi-longstocking.jpg",
    "price": 7.99,
    "binding": "Paperback",
    "publisher": "Fairy Tale Books"
  },
  {
    "title": "The Adventures of Pinocchio",
    "author": "Carlo Collodi",
    "genre": "Books for Children",
    "description": "The tale of a wooden puppet named Pinocchio who longs to become a real boy and learns important lessons along the way.",
    "year": 1883,
    "ISBN": "9780141331645",
    "pages": 208,
    "language": "English",
    "image": "/images/pinocchio.jpg",
    "price": 7.99,
    "binding": "Paperback",
    "publisher": "Fairy Tale Books"
  },
  {
    "title": "The Jungle Book",
    "author": "Rudyard Kipling",
    "genre": "Books for Children",
    "description": "The story of Mowgli, a boy raised by wolves in the Indian jungle, and his adventures with Baloo the bear and Bagheera the panther.",
    "year": 1894,
    "ISBN": "9780141325293",
    "pages": 240,
    "language": "English",
    "image": "/images/jungle-book.jpg",
    "price": 7.99,
    "binding": "Paperback",
    "publisher": "Fairy Tale Books"
  },
  {
    "title": "The Magic of Thinking Big",
    "author": "David J. Schwartz",
    "genre": "Books for Students",
    "description": "A motivational book that encourages readers to set high goals and believe in their potential.",
    "year": 1959,
    "ISBN": "9780671641789",
    "pages": 368,
    "language": "English",
    "image": "/images/magic-of-thinking-big.jpg",
    "price": 16.99,
    "binding": "Paperback",
    "publisher": "Personal Growth Publishing"
  },
  {
    "title": "Oxford English Dictionary",
    "author": "Oxford University Press",
    "genre": "Books for Students",
    "description": "The most comprehensive and authoritative collection of English words and their meanings.",
    "year": 2010,
    "ISBN": "9780198611868",
    "pages": 2200,
    "language": "English",
    "image": "/images/oxford-english-dictionary.jpg",
    "price": 35.99,
    "binding": "Hardcover",
    "publisher": "Oxford University Press"
  },
  {
    "title": "How to Read a Book",
    "author": "Mortimer J. Adler and Charles Van Doren",
    "genre": "Books for Students",
    "description": "A classic guide to reading comprehension, offering strategies for different reading techniques and deeper understanding.",
    "year": 1972,
    "ISBN": "9780671212094",
    "pages": 426,
    "language": "English",
    "image": "/images/how-to-read-a-book.jpg",
    "price": 12.99,
    "binding": "Paperback",
    "publisher": "Reading Essentials Publishing"
  },
  {
    "title": "The Art of Public Speaking",
    "author": "Stephen E. Lucas",
    "genre": "Books for Students",
    "description": "A comprehensive guide on the principles and techniques of effective public speaking.",
    "year": 2019,
    "ISBN": "9781260084901",
    "pages": 720,
    "language": "English",
    "image": "/images/art-of-public-speaking.jpg",
    "price": 19.99,
    "binding": "Hardcover",
    "publisher": "Public Speaking Publishing"
  }
];

module.exports = books;
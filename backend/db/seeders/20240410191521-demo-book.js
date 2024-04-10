'use strict';

const { Books } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Books.bulkCreate([
      {
        title: 'A Court of Mist and Fury',
        author: 'Sarah J. Maas',
        genre: 'Fantasy',
        publicationDate: 'May 3, 2016',
        isbn: '9781635575583',
        description: "The seductive and stunning #1 New York Times bestselling sequel to Sarah J. Maas's spellbinding A Court of Thorns and Roses. Feyre has undergone more trials than one human woman can carry in her heart. Though she/'s now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people. As her marriage to Tamlin approaches, Feyre/'s hollowness and nightmares consume her. She finds herself split into two different one who upholds her bargain with Rhysand, High Lord of the feared Night Court, and one who lives out her life in the Spring Court with Tamlin. While Feyre navigates a dark web of politics, passion, and dazzling power, a greater evil looms. She might just be the key to stopping it, but only if she can harness her harrowing gifts, heal her fractured soul, and decide how she wishes to shape her future-and the future of a world in turmoil.",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1620325671i/50659468.jpg',
        totalPages: 626
      },
      {
        title: 'Winterset Hollow',
        author: 'Jonathan Edward Durham',
        genre: 'Horror',
        publicationDate: 'September 1, 2021',
        isbn: '9781625862082',
        description: "Everyone has wanted their favorite book to be real, if only for a moment. Everyone has wished to meet their favorite characters, if only for a day. But be careful in that wish, for even a history laid in ink can be repaid in flesh and blood, and reality is far deadlier than fiction . . . especially on Addington Isle. Winterset Hollow follows a group of friends to the place that inspired their favorite book-a timeless tale about a tribe of animals preparing for their yearly end-of-summer festival. But after a series of shocking discoveries, they find that much of what the world believes to be fiction is actually fact, and that the truth behind their beloved story is darker and more dangerous than they ever imagined. It/'s Barley Day . . . and you/'re invited to the hunt.",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630955865i/58934632.jpg',
        totalPages: 274,
      },
      {
        title: 'So Long, and Thanks for All the Fish',
        author: 'Douglas Adams',
        genre: 'Science Fiction',
        publicationDate: 'October 12, 1984',
        isbn: '9780671525804',
        description: "Back on Earth with nothing more to show for his long, strange trip through time and space than a ratty towel and a plastic shopping bag, Arthur Dent is ready to believe that the past eight years were all just a figment of his stressed-out imagination. But a gift-wrapped fishbowl with a cryptic inscription, the mysterious disappearance of Earth'/s dolphins, and the discovery of his battered copy of The Hitchhiker's Guide to the Galaxy all conspire to give Arthur the sneaking suspicion that something otherworldly is indeed going on. . .God only knows what it all means. And fortunately, He left behind a Final Message of explanation. But since it/'s light-years away from Earth, on a star surrounded by souvenir booths, finding out what it is will mean hitching a ride to the far reaches of space aboard a UFO with a giant robot. But what else is new?",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327873354i/6091075.jpg',
        totalPages: 255,
      },
      {
        title: 'The Duke and I',
        author: 'Julia Quinn',
        genre: 'Historical Romance',
        publicationDate: 'January 5, 2000',
        isbn: '9780380800827',
        description: "In the ballrooms and drawing rooms of Regency London, rules abound. From their earliest days, children of aristocrats learn how to address an earl and curtsey before a prince—while other dictates of the ton are unspoken yet universally understood. A proper duke should be imperious and aloof. A young, marriageable lady should be amiable… but not too amiable. Daphne Bridgerton has always failed at the latter. The fourth of eight siblings in her close-knit family, she has formed friendships with the most eligible young men in London. Everyone likes Daphne for her kindness and wit. But no one truly desires her. She is simply too deuced honest for that, too unwilling to play the romantic games that captivate gentlemen. Amiability is not a characteristic shared by Simon Basset, Duke of Hastings. Recently returned to England from abroad, he intends to shun both marriage and society—just as his callous father shunned Simon throughout his painful childhood. ",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1379594717i/110391.jpg',
        totalPages: 384
      },
      {
        title: 'Harry Potter and the Order of the Phoenix',
        author: 'J.K. Rowling',
        genre: 'Young Adult',
        publicationDate: 'June 21, 2003',
        isbn: '9780747551003',
        description: "Harry Potter is about to start his fifth year at Hogwarts School of Witchcraft and Wizardry. Unlike most schoolboys, Harry never enjoys his summer holidays, but this summer is even worse than usual. The Dursleys, of course, are making his life a misery, but even his best friends, Ron and Hermione, seem to be neglecting him. Harry has had enough. He is beginning to think he must do something, anything, to change his situation, when the summer holidays come to an end in a very dramatic fashion. What Harry is about to discover in his new year at Hogwarts will turn his world upside down...",
        coverImageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546910265i/2.jpg",
        totalPages: 912
      },
      {
        title: "Why Has Nobody Told Me This Before?",
        author: 'Dr. Julie Smith',
        genre: 'Self Help',
        publicationDate: 'January 6, 2022',
        isbn: '9780063227934',
        description: "Drawing on years of experience as a clinical psychologist, online sensation Dr Julie Smith provides the skills you need to navigate common life challenges and take charge of your emotional and mental health in her debut book. Filled with secrets from a therapist's toolkit, Why Has Nobody Told Me This Before? teaches you how to fortify and maintain your mental health, even in the most trying of times. Dr Julie Smith's expert advice and powerful coping techniques will help you stay resilient, whether you want to manage anxiety, deal with criticism, cope with depression, build self-confidence, find motivation, or learn to forgive yourself. The book tackles everyday issues and offers practical solutions in bite-sized, easy-to-digest entries which make it easy to quickly find specific information and guidance. Your mental well-being is just as important as your physical well-being. ",
        coverImageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1670001084i/58536046.jpg",
        totalPages: 368
      },
      {
        title: 'Fahrenheit 451',
        author: 'Ray Bradbury',
        genre: 'Fiction',
        publicationDate: 'October 19, 1953',
        isbn: '9780007491568',
        description: "Guy Montag is a fireman. His job is to burn books, which are forbidden, being the source of all discord and unhappiness. Even so, Montag is unhappy; there is discord in his marriage. Are books hidden in his house? The Mechanical Hound of the Fire Department, armed with a lethal hypodermic, escorted by helicopters, is ready to track down those dissidents who defy society to preserve and read books. The classic dystopian novel of a post-literate future, Fahrenheit 451 stands alongside Orwell’s 1984 and Huxley’s Brave New World as a prophetic account of Western civilization’s enslavement by the media, drugs and conformity. Bradbury’s powerful and poetic prose combines with uncanny insight into the potential of technology to create a novel which, decades on from first publication, still has the power to dazzle and shock.",
        coverImageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1469704347i/17470674.jpg",
        totalPages: 227
      },
      {
        title: 'Animal Farm',
        author: "George Orwell",
        genre: "Classics",
        publicationDate: 'August 17, 1945',
        isbn: '9780451526342',
        description: "A farm is taken over by its overworked, mistreated animals. With flaming idealism and stirring slogans, they set out to create a paradise of progress, justice, and equality. Thus the stage is set for one of the most telling satiric fables ever penned –a razor-edged fairy tale for grown-ups that records the evolution from revolution against tyranny to a totalitarianism just as terrible. When Animal Farm was first published, Stalinist Russia was seen as its target. Today it is devastatingly clear that wherever and whenever freedom is attacked, under whatever banner, the cutting clarity and savage comedy of George Orwell’s masterpiece have a meaning and message still ferociously fresh.",
        coverImageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1325861570i/170448.jpg",
        totalPages: 141
      },
      {
        title: 'Murder on the Orient Express',
        author: 'Agatha Christie',
        genre: 'Mystery',
        publicationDate: 'January 1, 1934',
        isbn: '9780007119318' ,
        description: "Just after midnight, a snowdrift stops the famous Orient Express in its tracks as it travels through the mountainous Balkans. The luxurious train is surprisingly full for the time of the year but, by the morning, it is one passenger fewer. An American tycoon lies dead in his compartment, stabbed a dozen times, his door locked from the inside. One of the passengers is none other than detective Hercule Poirot. On vacation. Isolated and with a killer on board, Poirot must identify the murderer—in case he or she decides to strike again.",
        coverImageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1486131451i/853510.jpg",
        totalPages: 274
      },
      {
        title: 'Hell Bent',
        author: "Leigh Bardugo",
        genre: "Fantasy",
        publicationDate: "January 10, 2023",
        isbn: '9781250313102',
        description: "Wealth. Power. Murder. Magic. Alex Stern is back and the Ivy League is going straight to hell in #1 New York Times bestselling author Leigh Bardugo's Hell Bent. Find a gateway to the underworld. Steal a soul out of hell. A simple plan, except people who make this particular journey rarely come back. But Galaxy “Alex” Stern is determined to break Darlington out of purgatory―even if it costs her a future at Lethe and at Yale. Forbidden from attempting a rescue, Alex and Dawes can’t call on the Ninth House for help, so they assemble a team of dubious allies to save the gentleman of Lethe. Together, they will have to navigate a maze of arcane texts and bizarre artifacts to uncover the societies’ most closely guarded secrets, and break every rule doing it. But when faculty members begin to die off, Alex knows these aren’t just accidents. Something deadly is at work in New Haven, and if she is going to survive, she’ll have to reckon with the monsters of her past and a darkness built into the university’s very walls. Thick with history and packed with Bardugo’s signature twists, Hell Bent brings to life an intricate world full of magic, violence, and all too real monsters.",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1648744814i/60652997.jpg',
        totalPages: 481
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Books';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['A Court of Mist and Fury', 'Winterset Hollow',
      'So Long, and Thanks for All the Fish', 'The Duke and I',
      'Harry Potter and the Order of the Phoenix', "Why Has Nobody Told Me This Before?",
      'Fahrenheit 451', 'Animal Farm', 'Murder on the Orient Express', 'Hell Bent'] }
    }, {});
  }
};

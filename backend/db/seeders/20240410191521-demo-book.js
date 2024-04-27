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
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
        genre: 'Young Adult',
        publicationDate: 'June 2, 1999',
        isbn: '9780439420105',
        description: "Ever since Harry Potter had come home for the summer, the Dursleys had been so mean and hideous that all Harry wanted was to get back to the Hogwarts School for Witchcraft and Wizardry. But just as he’s packing his bags, Harry receives a warning from a strange impish creature who says that if Harry returns to Hogwarts, disaster will strike.",
        coverImageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474169725i/15881.jpg",
        totalPages: 352
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
      },
      {
        title: 'Weyward',
        author: 'Emilia Hart',
        genre: 'Historical Fiction',
        publicationDate: 'March 7, 2023',
        isbn: '9781250280800',
        description: "I am a Weyward, and wild inside. 2019: Under cover of darkness, Kate flees London for ramshackle Weyward Cottage, inherited from a great aunt she barely remembers. But she begins to suspect that her great aunt had a secret. One that lurks in the bones of the cottage, hidden ever since the witch-hunts of the 17th century. 1619: Altha is awaiting trial for the murder of a local farmer who was stampeded to death by his herd. As a girl, Altha’s mother taught her their magic, a kind not rooted in spell casting but in a deep knowledge of the natural world. But unusual women have always been deemed dangerous, she knows it will take all of her powers to maintain her freedom. 1942: As World War II rages, Violet is trapped in her family's grand, crumbling estate. Straitjacketed by societal convention, she longs for the robust education her brother receives–and for her mother, long deceased, who was rumored to have gone mad before her death. Weaving together the stories of three extraordinary women across five centuries, Emilia Hart's Weyward is an enthralling novel of female resilience and the transformative power of the natural world.",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1677756582i/60654349.jpg',
        totalPages: 329
      },
      {
        title: 'The Blade Itself',
        author: 'Joe Abercrombie',
        genre: 'Fantasy',
        publicationDate: 'March 8, 2007',
        isbn: '9780575079793',
        description: "Logen Ninefingers, infamous barbarian, has finally run out of luck. He’s on the verge of becoming a dead barbarian – leaving nothing behind him but bad songs, dead friends, and a lot of happy enemies. Nobleman Captain Jezal dan Luthar, dashing officer, and paragon of selfishness, has nothing more dangerous in mind than fleecing his friends at cards and dreaming of glory in the fencing circle. But war is brewing, and on the battlefields of the frozen North they fight by bloodier rules. Inquisitor Glokta, cripple turned torturer, would like nothing better than to see Jezal come home in a box. But, Glokta hates everyone: cutting treason out of the Union one confession at a time leaves little room for friendship. His latest trail of corpses may lead him right to the rotten heart of government. Enter the wizard, Bayaz. A old man with a terrible temper and a pathetic assistant, he could be the First of the Magi, he could be a spectacular fraud, but whatever he is, he's about to make the lives of Logen, Jezal, and Glokta a lot more difficult. Murderous conspiracies rise to the surface, old scores are ready to be settled, and the line between hero and villain is sharp enough to draw blood.",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1284167912l/944073.jpg',
        totalPages: 515
      },
      {
        title: 'Shatter Me',
        author: 'Tahereh Mafi',
        genre: 'Dystopia',
        publicationDate: 'November 15, 2011',
        isbn: '9780062085481',
        description: "I have a curse I have a gift I am a monster I'm more than human My touch is lethal My touch is power I am their weapon I will fight back Juliette hasn't touched anyone in exactly 264 days. The last time she did, it was an accident, but The Reestablishment locked her up for murder. No one knows why Juliette's touch is fatal. As long as she doesn't hurt anyone else, no one really cares. The world is too busy crumbling to pieces to pay attention to a 17-year-old girl. Diseases are destroying the population, food is hard to find, birds don't fly anymore, and the clouds are the wrong color. The Reestablishment said their way was the only way to fix things, so they threw Juliette in a cell. Now so many people are dead that the survivors are whispering war—and The Reestablishment has changed its mind. Maybe Juliette is more than a tortured soul stuffed into a poisonous body. Maybe she's exactly what they need right now. Juliette has to make a choice: Be a weapon. Or be a warrior.",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1338924054i/13455782.jpg',
        totalPages: 338
      },
      {
        title: 'Twilight',
        author: 'Stephenie Meyer',
        genre: 'Fantasy',
        publicationDate: 'September 6, 2006',
        isbn: '9780316015844',
        description: "Isabella Swan's move to Forks, a small, perpetually rainy town in Washington, could have been the most boring move she ever made. But once she meets the mysterious and alluring Edward Cullen, Isabella's life takes a thrilling and terrifying turn. Up until now, Edward has managed to keep his vampire identity a secret in the small community he lives in, but now nobody is safe, especially Isabella, the person Edward holds most dear. The lovers find themselves balanced precariously on the point of a knife -- between desire and danger. Deeply romantic and extraordinarily suspenseful, Twilight captures the struggle between defying our instincts and satisfying our desires. This is love story with bite.",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1700522826i/41865.jpg',
        totalPages: 498
      },
      {
        title: 'Fourth Wing',
        author: 'Rebecca Yarros',
        genre: 'Fantasy',
        publicationDate: 'May 2, 2023',
        isbn: '9781649374042',
        description: "Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general—also known as her tough-as-talons mother—has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders. But when you’re smaller than everyone else and your body is brittle, death is only a heartbeat away...because dragons don’t bond to “fragile” humans. They incinerate them. With fewer dragons willing to bond than cadets, most would kill Violet to better their own chances of success. The rest would kill her just for being her mother’s daughter—like Xaden Riorson, the most powerful and ruthless wingleader in the Riders Quadrant. She’ll need every edge her wits can give her just to see the next sunrise. Yet, with every day that passes, the war outside grows more deadly, the kingdom's protective wards are failing, and the death toll continues to rise. Even worse, Violet begins to suspect leadership is hiding a terrible secret. Friends, enemies, lovers. Everyone at Basgiath War College has an agenda—because once you enter, there are only two ways out: graduate or die",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1701980900i/61431922.jpg',
        totalPages: 498
      },
      {
        title: 'A Court of Wings and Ruin',
        author: 'Sarah J. Maas',
        genre: 'Fantasy',
        publicationDate: 'June 2, 2020',
        isbn: '9781635575606',
        description: "Feyre has returned to the Spring Court, determined to gather information on Tamlin's actions and learn what she can about the invading king threatening to bring her land to its knees. But to do so she must play a deadly game of deceit. One slip could bring doom not only for Feyre, but for everything-and everyone-she holds dear. As war bears down upon them all, Feyre endeavors to take her place amongst the High Fae of the land, balancing her struggle to master her powers-both magical and political-and her love for her court and family. Amidst these struggles, Feyre and Rhysand must decide whom to trust amongst the cunning and lethal High Lords, and hunt for allies in unexpected places. In this thrilling third book in the #1 New York Times bestselling series from Sarah J. Maas, the fate of Feyre's world is at stake as armies grapple for power over the one thing that could destroy it.",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1585623092i/50659472.jpg',
        totalPages: 703
      },
      {
        title: 'Throne of Glass',
        author: 'Sarah J. Maas',
        genre: 'Young Adult',
        publicationDate: 'February 14, 2023',
        isbn: '9781639730940',
        description: "In a land without magic, where the king rules with an iron hand, an assassin is summoned to the castle. She comes not to kill the king, but to win her freedom. If she defeats twenty-three killers, thieves, and warriors in a competition, she is released from prison to serve as the king's champion. Her name is Celaena Sardothien.The Crown Prince will provoke her. The Captain of the Guard will protect her. But something evil dwells in the castle of glass—and it's there to kill. When her competitors start dying one by one, Celaena's fight for freedom becomes a fight for survival, and a desperate quest to root out the evil before it destroys her world.",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1673566495i/76703559.jpg',
        totalPages: 406
      },
      {
        title: 'Frankenstien',
        author: 'Mary Wollstonecraft Shelley',
        genre: 'Horror',
        publicationDate: 'January 1, 1818',
        isbn: '9780141439471',
        description: "'Now that I had finished, the beauty of the dream vanished, and breathless horror and disgust filled my heart ...' Obsessed with creating life itself, Victor Frankenstein plunders graveyards for the material to fashion a new being, which he shocks into life with electricity. But his botched creature, rejected by Frankenstein and denied human companionship, sets out to destroy his maker and all that he holds dear. Mary Shelley's chilling Gothic tale was conceived when she was only eighteen, living with her lover Percy Shelley near Byron's villa on Lake Geneva. It would become the world's most famous work of horror fiction, and remains a devastating exploration of the limits of human creativity. Based on the third edition of 1831, this volume contains all the revisions Mary Shelley made to her story, as well as her 1831 introduction and Percy Bysshe Shelley's preface to the first edition. This revised edition includes as appendices a select collation of the texts of 1818 and 1831 together with 'A Fragment' by Lord Byron and Dr John Polidori's 'The Vampyre: A Tale'.",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1665008650i/18490.jpg',
        totalPages: 273
      },
      {
        title: "Alice’s Adventures in Wonderland & Through the Looking-Glass",
        author: 'Lewis Carroll',
        genre: 'Fantasy',
        publicationDate: 'December 27, 1871',
        isbn: '9780785824466',
        description: "'I can't explain myself, I'm afraid, sir,' said Alice, 'Because I'm not myself, you see.' When Alice sees a white rabbit take a watch out of its waistcoat pocket she decides to follow it, and a sequence of most unusual events is set in motion. This mini book contains the entire topsy-turvy stories of Alice's Adventures in Wonderland and Through the Looking-Glass, accompanied by practical notes and Martina Pelouso's memorable full-colour illustrations.",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630487234i/24213.jpg',
        totalPages: 239
      },
      {
        title: 'The Invisible Life of Addie LaRue',
        author: 'V.E. Schwab',
        genre: 'Fantasy',
        publicationDate: 'October 6, 2020',
        isbn: '9780765387561',
        description: "France, 1714: in a moment of desperation, a young woman makes a Faustian bargain to live forever and is cursed to be forgotten by everyone she meets. Thus begins the extraordinary life of Addie LaRue, and a dazzling adventure that will play out across centuries and continents, across history and art, as a young woman learns how far she will go to leave her mark on the world. But everything changes when, after nearly 300 years, Addie stumbles across a young man in a hidden bookstore and he remembers her name.",
        coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1584633432i/50623864.jpg',
        totalPages: 448
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Books';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['A Court of Mist and Fury', 'A Court of Wings and Ruin', 'Winterset Hollow',
      'So Long, and Thanks for All the Fish', 'The Duke and I', 'Harry Potter and the Chamber of Secrets',
      'Harry Potter and the Order of the Phoenix', "Why Has Nobody Told Me This Before?",
      'Fahrenheit 451', 'Animal Farm', 'Murder on the Orient Express', 'Hell Bent', 'Weyward', 'The Blade Itself',
      'Shatter Me', 'Fourth Wing', 'Twilight', 'Throne of Glass', 'Frankenstien',
      "Alice’s Adventures in Wonderland & Through the Looking-Glass", 'The Invisible Life of Addie LaRue'] }
    }, {});
  }
};

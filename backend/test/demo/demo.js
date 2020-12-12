const Hugs = require("../../model/Hugs");
const Friends = require("../../model/Friends");

const user = "PNJYH3alhAXoICSQf2T6p2HwSv42";

const user1 = "g3ATD324vhSaIQp9laqEnuRbkRf1";
const user2 = "jsKZSXZ3y2gkigOTzGhDi2EhxrT2";
const user3 = "tTZ3ef6P95dgFdJTA0sYPBWD31h2";
const user4 = "qbcg8yC9vIaYMmgSVXcpwZXi0B53";

Friends.FriendsAPI.addFriend(user, user1);
Friends.FriendsAPI.addFriend(user, user2);
Friends.FriendsAPI.addFriend(user, user3); 
Friends.FriendsAPI.addFriend(user, user4);

Hugs.HugsAPI.createHug(
  user,
  user1,
  "Thanks for hanging out with me today at the cafe!",
  []
);
Hugs.UpdateHugAPI.respondToHug(
  user1,
  "Xn55qobYFO0MnXocQ9Km",
  "That was so much fun! Same time next week?",
  []
);

Hugs.HugsAPI.createHug(user, user2, "Finals Week 10 UGHHH", []);

Hugs.UpdateHugAPI.respondToHug(
  user2,
  "4ovpkfNPT1bhccQBIa5l",
  "Study Grind is gonna be great. We should study over zoom sometimg :)",
  []
);

Hugs.HugsAPI.createHug(
  user,
  user3,
  "Thanks for helping me out this week with the move. It's tough to find friends who are down anyday of the week so I appreciate it!",
  []
);

Hugs.UpdateHugAPI.respondToHug(
  user3,
  "6rHxMBOJqEIL8qGt6Tq4",
  "Yeah just lemme know anytime when you need help. 24 hours a day, 7 days a week",
  []
);
Hugs.HugsAPI.createHug(
  user,
  user3,
  "Studying by the beach was so much fun. Definitely need to do this more",
  []
);
Hugs.UpdateHugAPI.respondToHug(
  user3,
  "jRHsrY5sNBAqhLXUzXEj",
  "Breeze indeed 10/10. Much needed relaxing study day",
  []
);

# SimpleSysInfo

Simple Client-Server communication where 'Redis Publisher' & 'Redis Subscriber' periodically shares system info (HOST NAME, FREE MEMORY) in a pub/sub model. 'Redis Subscriber' sends it to 'Web Socket Server' which consequently sends to 'Web Socket Clients'.

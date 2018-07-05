#This file should parse the Alphabet_Order directory and obtain a link to every player's url at a basketball site. 
from HTMLParser import HTMLParser
from os import listdir
from os.path import isfile, join

class PlayerParser(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.tbody_count = 0
        self.get_data = 0
        self.tbody = 1
        return

    def handle_starttag(self, tag, attrs):
        #if any('a' in s for s in attrs):
        if (tag == 'a' and any('href' in s for s in attrs)):
            self.get_data = 1
            for a, b in attrs:
                if ('/players/' in b and len(attrs) == 1 and self.tbody == 1):
                    ppage = "www.basketball-reference.com" + b
                    #print(ppage)
                    fname = "listofplayershtml"
                    if (ppage!= 'www.basketball-reference.com/players/'):
                        self.f = open(fname, "a+")
                        self.f.write(ppage + '\n')
                        self.get_data = 0

    def handle_endtag(self, tag):
        if(tag == 'tbody' and self.get_data == 1):
            self.tbody = 0
        return
        #print "Encountered an end tag :", tag

mypath = "Alphabetical_Order/"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

for filename in onlyfiles: 
    print(filename)
    file = open("Alphabetical_Order/"+filename, "r")
    data = file.read()
    parser = PlayerParser()
    parser.feed(data)

#print(filename)
#filename = "1.html"
#file = open(filename, "r")
#data = file.read()
#parser = MyHTMLParser()
#parser.feed(data)


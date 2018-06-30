from HTMLParser import HTMLParser

# create a subclass and override the handler methods
class MyHTMLParser(HTMLParser):
    def __init__(self):
        #super().__init__()
        HTMLParser.__init__(self)
        self.tag_on = 0
        self.name_on = 0
        self.count = 0
        self.date = 0
        return
    def handle_starttag(self, tag, attrs):
        if(tag == 'pre'):
            print("encountered pre")
        if any('csv_pgl_basic' in s for s in attrs):
            self.tag_on = 1;
            print("encountered csv Table:")
        #find name 
        if(tag == "strong" and self.count <3):
            if(self.count == 0):
                self.date = 1 #to get the year of play
            self.count += 1
            if(self.count == 3):
                self.name_on = 1
        return
        

    def handle_endtag(self, tag):
        if(tag == 'pre'):
            print "Encountered an end tag :", tag
            self.tag_on = 0
        return
        #print "Encountered an end tag :", tag

    def handle_data(self, data):
        if(self.date == 1):
            self.year = data
            #print(self.year)
            self.date = 0
        if( self.tag_on == 1):
            self.f.write(data)
            self.f.close()
            #print "Encountered some data  :", data
            return
        if(self.name_on == 1):
            #write to file
            fname = data+self.year+".csv"
            fname = fname.replace(" " , "_")
            print(fname)
            self.f= open(fname,"w+")
            self.name_on = 0
            return

# instantiate the parser and fed it some HTML
filename = "1.html"
file = open(filename, "r")
data = file.read()
parser = MyHTMLParser()
parser.feed(data)

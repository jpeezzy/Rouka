from HTMLParser import HTMLParser

# create a subclass and override the handler methods
class MyHTMLParser(HTMLParser):
    def __init__(self):
        #super().__init__()
        HTMLParser.__init__(self)
        self.tag_on = 0
        return
    def handle_starttag(self, tag, attrs):
        if(tag == 'pre'):
            print("encountered pre")
        if any('csv_pgl_basic' in s for s in attrs):
            self.tag_on = 1;
            print("encountered csv Table:")
        #if any("class" in s for s in attrs):
            #if any("class" in s for s in attrs):
            #print(attrs)
        #    if any('overthrow table_container'in s for s in attrs):
        return
        
        #print "Encountered a start tag:", tag

    def handle_endtag(self, tag):
        if(tag == 'pre'):
            print "Encountered an end tag :", tag
            self.tag_on = 0
        return
        #print "Encountered an end tag :", tag

    def handle_data(self, data):
        if( self.tag_on == 1):
            print "Encountered some data  :", data
            return

# instantiate the parser and fed it some HTML
filename = "1.html"
file = open(filename, "r")
data = file.read()
parser = MyHTMLParser()
parser.feed(data)

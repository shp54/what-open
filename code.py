import os
import webapp2
import urllib
from google.appengine.ext.webapp import template
from google.appengine.api import urlfetch

api_key = 'AIzaSyAsaKDM1E9cv45rSvphS8hv1X7eKtovbBg'

def getTemplatePath(name):
  path = os.path.join(os.path.dirname(__file__), 'templates', name)
  return path

class GetFoodLocation(webapp2.RequestHandler):
  def get(self):
    #Get location from request
    longitude = self.request.get('long')
    latitude  = self.request.get('lat')

    #Passing in parameters to HTTP request
    parameters = {
    'key': api_key,
    'location': str(latitude) + ',' + str(longitude), #has to be (latitude,longitude)
    'types': 'food',
    'rankby': 'distance',
    'opennow': '' #This is the important part
    }

    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' #Need the question mark, so we can add parameters   
    result = urlfetch.fetch(url + urllib.urlencode(parameters))

    #Write out the JSON
    self.response.headers['Content-Type'] = 'application/json' 
    self.response.out.write(result.content)


class MainPage(webapp2.RequestHandler):
    def get(self):
        path = getTemplatePath('index.html')
        self.response.out.write(template.render(path, {}))
        
app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/open', GetFoodLocation)
    ], debug=True)

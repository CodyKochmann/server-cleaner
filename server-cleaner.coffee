# Author: Cody Kochmann
# Version: 1
# Last Updated: Sat Jun  6 08:17:03 PDT 2015
# License: http://cody.pw/license
# Description: A coffeescript based cleaner for static file servers 
#   since the user interphase for file servers right now is a little 
#   bare bones.
# Usage: this could be used as a footer script in a file server page
#   for devs that dont want to design everything. It can also be used 
#   as a bookmarklet for those who like this idea and would like to
#   just have it as a tool that is always there for them.

collected_elements=[]
a_list=document.getElementsByTagName("a")
for i in a_list
  if i.innerText != undefined and i.href != undefined
    collected_elements.push({"href":i.href,"text":i.innerText})

console.log(JSON.stringify(collected_elements))

type_guide=[{
      "type": "directory",
      "types": ""
    },{
    "type":"video"
    "types":"mp4 avi mkv flv"
    },{
    "type":"photo"
    "types":"png jpeg jpg webm PNG JPEG JPG WEBM"
    },{
    "type":"audio"
    "types":"m4a mp3 aiff"
    },{
    "type":"source_code"
    "types":"py bookmarklet coffee js py rb coffee txt rtf"
    },{
    "type":"database"
    "types":"sqlite db"
    },{
    "type":"archive"
    "types":"7z zip jar tar gzip bz"
    },{
    "type":"log"
    "types":"md out log"
    },{
    "type":"other"
    "types":""
    }]

for i in collected_elements
  # search for directories
  if i.text.split("").pop()=="/"
    i["type"]="directory"

  for t in type_guide
    if i.text.split(".").pop() in t.types.split(' ')
      i['type']=t['type']

  if i["type"]==undefined
    i["type"]="other"

gen_link=(list_object)->
  d=document.createElement("a")
  d.innerText = list_object['text']
  d.className=list_object['type']
  d.href=list_object['href']
  css="""<style>a{
        margin: 6px;
        position: relative;
        float: left;
        text-decoration: none;
        color: white;
        padding: 0.08in;
        font-family: 'Avenir Next';
        width:auto;
        background: rgba(100,100,100,0.8);
        text-align: center;
      }
      a:hover, a:active{
        background: blue;
      }</style>
    """
  css+d.outerHTML

gen_photo=(list_object)->
  d=document.createElement("img")
  #d.innerText = list_object['text']
  d.className=list_object['type']
  d.src=list_object['href']
  d.href=list_object['href']
  css="""<style>.photo{
        margin: 6px;
        position: relative;
        height:2in;
        float: left;
        width:auto;
      }
      .photo:hover, .photo:active{
        opacity:0.6;
      }</style>
    """
  css+d.outerHTML
  
for i in collected_elements
  console.log(gen_link(i))
  i['html']=gen_link(i)
  if i['type'] == "photo"
    i['html']=gen_photo(i)

document.write "<html><body style='width:100%;height:auto;background:rgba(20,20,20,0.9);margin:0;'>"

for i in type_guide
  element_has_been_added=false
  d=document.createElement("div")
  d.className=i['type']+"_container"
  s=d.style
  s.position="relative"
  s.height="auto"
  s.width="80%"
  s.margin="0.1in 10%"
  s.float="left"
  d.innerHTML="<p style='height:0.25in;width:100%;margin:0.05in 0;border-bottom:solid 1px white;color:white;font-family:arial;'>#{i['type']}</p>"
  for x in collected_elements
    if x['type']==i['type']
      element_has_been_added=true
      d.innerHTML+=x['html']
  if element_has_been_added
    document.write d.outerHTML

document.write "</body></html>"

for i in document.getElementsByTagName("img")
  i.ondblclick=()->
    console.log "opening #{this.src}"
    location.href=this.src

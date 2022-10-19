import pytube

# baixar playlist do youtube
url = input('Enter playlist url: ')
playlist = pytube.Playlist(url)
for url in playlist:
    video = pytube.YouTube(url)
    stream = video.streams.get_highest_resolution()
    stream.download()

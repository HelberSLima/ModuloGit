import pytube

# baixa um video por vez no youtube
url = input('Enter video url: ')
filename = input('Enter filename: ')
video = pytube.YouTube(url)
stream = video.streams.get_highest_resolution()
print('Downloading video...')
stream.download(filename=filename)
print('Finished downloading video.')

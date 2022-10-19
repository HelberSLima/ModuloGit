import pytube

# baixa varios videos no youtube
video_list = []
url = input('Enter video url: ')
print('Enter urls (Enter e to exit)')
while True:
    if url == 'e':
        break
    video_list.append(url)
for x, video in enumerate(video_list):
    v = pytube.YouTube(video)
    stream = v.streams.get_highest_resolution()
    print(f'Downloading video {x}...')
    stream.download()
    print('Done')
print('Completed '+str(len(video_list))+' Downloads.')

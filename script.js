document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.querySelector('input[type="url"]');
    const downloadBtn = document.querySelector('.btn');
    const resultDiv = document.createElement('div');

    // Insert resultDiv after the form in the DOM
    document.querySelector('form').after(resultDiv);

    downloadBtn.addEventListener('click', e => {
        e.preventDefault();

        const url = fileInput.value;
        downloadBtn.innerText = 'Processing...';

        // Check if the URL is a YouTube link
        if (isYouTubeURL(url)) {
            redirectToYouTubeDownloader(url);
        } else {
            // Identify file type
            identifyFileType(url);

            // Fetch and download the file
            fetchFile(url);
        }
    });

    function identifyFileType(url) {
        // Extract the file extension
        const fileExtension = url.split('.').pop().toLowerCase();

        // Determine the file type
        let fileType = 'Unknown file type';

        const fileTypes = {
            'jpg': 'Image (JPEG)',
            'jpeg': 'Image (JPEG)',
            'png': 'Image (PNG)',
            'gif': 'Image (GIF)',
            'bmp': 'Image (BMP)',
            'svg': 'Image (SVG)',
            'pdf': 'Document (PDF)',
            'doc': 'Document (Word)',
            'docx': 'Document (Word)',
            'xls': 'Document (Excel)',
            'xlsx': 'Document (Excel)',
            'ppt': 'Document (PowerPoint)',
            'pptx': 'Document (PowerPoint)',
            'txt': 'Text file',
            'html': 'Web page (HTML)',
            'css': 'Stylesheet (CSS)',
            'js': 'Script (JavaScript)',
            'mp4': 'Video (MP4)',
            'mp3': 'Audio (MP3)',
            'wav': 'Audio (WAV)',
            'zip': 'Archive (ZIP)',
            'rar': 'Archive (RAR)',
            '7z': 'Archive (7-Zip)',
            'iso': 'Disk Image (ISO)',
        };

        if (fileTypes[fileExtension]) {
            fileType = fileTypes[fileExtension];
        }

        resultDiv.textContent = `File Type: ${fileType}`;
    }

    function fetchFile(url) {
        fetch(url)
            .then(res => res.blob())
            .then(file => {
                let tempURL = URL.createObjectURL(file);
                let aTag = document.createElement('a');
                aTag.href = tempURL;
                aTag.download = url.replace(/^.*[\\\/]/, '');
                document.body.appendChild(aTag);
                aTag.click();
                aTag.remove();
                URL.revokeObjectURL(tempURL);
                downloadBtn.innerText = 'Download File';
            })
            .catch(() => {
                downloadBtn.innerText = 'Download File';
                alert('Failed to download the file.');
            });
    }

    function isYouTubeURL(url) {
        // Simple check for YouTube URLs
        return /(?:youtube\.com\/watch\?v=|youtu\.be\/)/.test(url);
    }

    function redirectToYouTubeDownloader(url) {
        const saveFromURL = `https://en1.savefrom.net/1-youtube-video-downloader-3vV/?url=${encodeURIComponent(url)}`;
        window.location.href = saveFromURL;
    }
});

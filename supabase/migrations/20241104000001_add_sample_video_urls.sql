-- Add sample video URLs to existing curriculums for testing
-- Using sample videos from the internet for demonstration

UPDATE curriculums 
SET video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
WHERE title LIKE '%React%' OR title LIKE '%Frontend%';

UPDATE curriculums 
SET video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
WHERE title LIKE '%Node%' OR title LIKE '%Backend%';

UPDATE curriculums 
SET video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
WHERE title LIKE '%Full Stack%' OR title LIKE '%JavaScript%';

UPDATE curriculums 
SET video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
WHERE title LIKE '%Python%' OR title LIKE '%Data%';

-- If no specific matches, add a default video to the first few curriculums
UPDATE curriculums 
SET video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
WHERE video_url IS NULL 
AND id <= 3;
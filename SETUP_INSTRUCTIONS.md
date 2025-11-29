# Database Setup Instructions

To ensure all features (Video Playlist, Clinical Triage, etc.) work correctly, please execute the following SQL scripts in your **Supabase SQL Editor** in the order listed below.

## 1. Schema Updates (Run First)
- **Script**: `update_resources_schema.sql`
- **Purpose**: Adds necessary columns (`type`, `duration`, `content`, etc.) to the `resources` table.

## 2. Base Content
- **Script**: `seed_resources.sql`
- **Purpose**: Adds the initial set of resources (Articles, etc.).
- *Note: If you've already run this, you can skip it or ignore "duplicate key" errors.*

## 3. Content Refinements
- **Script**: `resources_content_update.sql`
- **Purpose**: Adds rich HTML content to the "Understanding Anxiety" article.
- **Script**: `update_video_url.sql`
- **Purpose**: Fixes YouTube embed URLs for initial videos.

## 4. New Features (Run These!)
- **Script**: `seed_expanded_resources.sql`
- **Purpose**: Adds the 12 new videos for the "Mindfulness" playlist.
- **Script**: `clinical_schema.sql`  <-- **CRITICAL FOR WORKBOOK**
- **Purpose**: Creates the tables for the Depression Workbook (`clinical_symptoms`, `cbt_distortions`, `user_clinical_logs`) and populates the triage data.

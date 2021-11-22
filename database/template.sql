--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.1 (Ubuntu 14.1-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: tiger; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "tiger";


--
-- Name: tiger_data; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "tiger_data";


--
-- Name: topology; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "topology";


--
-- Name: SCHEMA "topology"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA "topology" IS 'PostGIS Topology schema';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "fuzzystrmatch" WITH SCHEMA "public";


--
-- Name: EXTENSION "fuzzystrmatch"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "fuzzystrmatch" IS 'determine similarities and distance between strings';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "postgis" WITH SCHEMA "public";


--
-- Name: EXTENSION "postgis"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "postgis" IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: postgis_tiger_geocoder; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "postgis_tiger_geocoder" WITH SCHEMA "tiger";


--
-- Name: EXTENSION "postgis_tiger_geocoder"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "postgis_tiger_geocoder" IS 'PostGIS tiger geocoder and reverse geocoder';


--
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "postgis_topology" WITH SCHEMA "topology";


--
-- Name: EXTENSION "postgis_topology"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "postgis_topology" IS 'PostGIS topology spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- Name: article; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."article" (
    "id" integer NOT NULL,
    "status" character varying(255) DEFAULT 'draft'::character varying NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "title" character varying(255) NOT NULL,
    "content" "text" NOT NULL,
    "featured_image" "uuid",
    "tags" "jsonb"
);


--
-- Name: article_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."article_category" (
    "id" integer NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "name" character varying(255) NOT NULL
);


--
-- Name: article_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."article_category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: article_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."article_category_id_seq" OWNED BY "public"."article_category"."id";


--
-- Name: article_category_pivot; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."article_category_pivot" (
    "id" integer NOT NULL,
    "article_id" integer NOT NULL,
    "article_category_id" integer NOT NULL
);


--
-- Name: article_category_pivot_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."article_category_pivot_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: article_category_pivot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."article_category_pivot_id_seq" OWNED BY "public"."article_category_pivot"."id";


--
-- Name: article_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."article_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."article_id_seq" OWNED BY "public"."article"."id";


--
-- Name: audio; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."audio" (
    "id" integer NOT NULL,
    "status" character varying(255) DEFAULT 'draft'::character varying NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "title" character varying(255) NOT NULL,
    "audio" "uuid" NOT NULL,
    "description" "text",
    "tags" "json"
);


--
-- Name: audio_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."audio_category" (
    "id" integer NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "name" character varying(255) NOT NULL
);


--
-- Name: audio_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."audio_category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: audio_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."audio_category_id_seq" OWNED BY "public"."audio_category"."id";


--
-- Name: audio_category_pivot; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."audio_category_pivot" (
    "id" integer NOT NULL,
    "audio_id" integer NOT NULL,
    "audio_category_id" integer NOT NULL
);


--
-- Name: audio_category_pivot_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."audio_category_pivot_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: audio_category_pivot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."audio_category_pivot_id_seq" OWNED BY "public"."audio_category_pivot"."id";


--
-- Name: audio_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."audio_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: audio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."audio_id_seq" OWNED BY "public"."audio"."id";


--
-- Name: book; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."book" (
    "id" integer NOT NULL,
    "status" character varying(255) DEFAULT 'draft'::character varying NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "name" character varying(255) NOT NULL,
    "description" "text",
    "book" "uuid" NOT NULL,
    "author" integer,
    "tags" "jsonb"
);


--
-- Name: book_author; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."book_author" (
    "id" integer NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "name" character varying(255) NOT NULL,
    "photo" "uuid"
);


--
-- Name: book_author_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."book_author_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: book_author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."book_author_id_seq" OWNED BY "public"."book_author"."id";


--
-- Name: book_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."book_category" (
    "id" integer NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "name" character varying(255) NOT NULL
);


--
-- Name: book_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."book_category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: book_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."book_category_id_seq" OWNED BY "public"."book_category"."id";


--
-- Name: book_category_pivot; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."book_category_pivot" (
    "id" integer NOT NULL,
    "book_id" integer NOT NULL,
    "book_category_id" integer NOT NULL
);


--
-- Name: book_category_pivot_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."book_category_pivot_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: book_category_pivot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."book_category_pivot_id_seq" OWNED BY "public"."book_category_pivot"."id";


--
-- Name: book_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."book_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."book_id_seq" OWNED BY "public"."book"."id";


--
-- Name: comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."comment" (
    "id" integer NOT NULL,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "date_updated" timestamp with time zone,
    "comment" "text" NOT NULL,
    "approved" boolean DEFAULT false,
    "parent" integer
);


--
-- Name: comment_entity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."comment_entity" (
    "id" integer NOT NULL,
    "comment_id" integer NOT NULL,
    "item" character varying(255),
    "collection" character varying(255)
);


--
-- Name: comment_entity_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."comment_entity_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comment_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."comment_entity_id_seq" OWNED BY "public"."comment_entity"."id";


--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."comment_id_seq" OWNED BY "public"."comment"."id";


--
-- Name: directus_activity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_activity" (
    "id" integer NOT NULL,
    "action" character varying(45) NOT NULL,
    "user" "uuid",
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "ip" character varying(50) NOT NULL,
    "user_agent" character varying(255),
    "collection" character varying(64) NOT NULL,
    "item" character varying(255) NOT NULL,
    "comment" "text"
);


--
-- Name: directus_activity_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."directus_activity_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: directus_activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."directus_activity_id_seq" OWNED BY "public"."directus_activity"."id";


--
-- Name: directus_collections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_collections" (
    "collection" character varying(64) NOT NULL,
    "icon" character varying(30),
    "note" "text",
    "display_template" character varying(255),
    "hidden" boolean DEFAULT false NOT NULL,
    "singleton" boolean DEFAULT false NOT NULL,
    "translations" "json",
    "archive_field" character varying(64),
    "archive_app_filter" boolean DEFAULT true NOT NULL,
    "archive_value" character varying(255),
    "unarchive_value" character varying(255),
    "sort_field" character varying(64),
    "accountability" character varying(255) DEFAULT 'all'::character varying,
    "color" character varying(255),
    "item_duplication_fields" "json",
    "sort" integer,
    "group" character varying(64),
    "collapse" character varying(255) DEFAULT 'open'::character varying NOT NULL
);


--
-- Name: directus_dashboards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_dashboards" (
    "id" "uuid" NOT NULL,
    "name" character varying(255) NOT NULL,
    "icon" character varying(30) DEFAULT 'dashboard'::character varying NOT NULL,
    "note" "text",
    "date_created" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "user_created" "uuid"
);


--
-- Name: directus_fields; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_fields" (
    "id" integer NOT NULL,
    "collection" character varying(64) NOT NULL,
    "field" character varying(64) NOT NULL,
    "special" character varying(64),
    "interface" character varying(64),
    "options" "json",
    "display" character varying(64),
    "display_options" "json",
    "readonly" boolean DEFAULT false NOT NULL,
    "hidden" boolean DEFAULT false NOT NULL,
    "sort" integer,
    "width" character varying(30) DEFAULT 'full'::character varying,
    "translations" "json",
    "note" "text",
    "conditions" "json",
    "required" boolean DEFAULT false,
    "group" character varying(64)
);


--
-- Name: directus_fields_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."directus_fields_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: directus_fields_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."directus_fields_id_seq" OWNED BY "public"."directus_fields"."id";


--
-- Name: directus_files; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_files" (
    "id" "uuid" NOT NULL,
    "storage" character varying(255) NOT NULL,
    "filename_disk" character varying(255),
    "filename_download" character varying(255) NOT NULL,
    "title" character varying(255),
    "type" character varying(255),
    "folder" "uuid",
    "uploaded_by" "uuid",
    "uploaded_on" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "modified_by" "uuid",
    "modified_on" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "charset" character varying(50),
    "filesize" bigint,
    "width" integer,
    "height" integer,
    "duration" integer,
    "embed" character varying(200),
    "description" "text",
    "location" "text",
    "tags" "text",
    "metadata" "json"
);


--
-- Name: directus_folders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_folders" (
    "id" "uuid" NOT NULL,
    "name" character varying(255) NOT NULL,
    "parent" "uuid"
);


--
-- Name: directus_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_migrations" (
    "version" character varying(255) NOT NULL,
    "name" character varying(255) NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: directus_panels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_panels" (
    "id" "uuid" NOT NULL,
    "dashboard" "uuid" NOT NULL,
    "name" character varying(255),
    "icon" character varying(30) DEFAULT 'insert_chart'::character varying,
    "color" character varying(10),
    "show_header" boolean DEFAULT false NOT NULL,
    "note" "text",
    "type" character varying(255) NOT NULL,
    "position_x" integer NOT NULL,
    "position_y" integer NOT NULL,
    "width" integer NOT NULL,
    "height" integer NOT NULL,
    "options" "json",
    "date_created" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "user_created" "uuid"
);


--
-- Name: directus_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_permissions" (
    "id" integer NOT NULL,
    "role" "uuid",
    "collection" character varying(64) NOT NULL,
    "action" character varying(10) NOT NULL,
    "permissions" "json",
    "validation" "json",
    "presets" "json",
    "fields" "text"
);


--
-- Name: directus_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."directus_permissions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: directus_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."directus_permissions_id_seq" OWNED BY "public"."directus_permissions"."id";


--
-- Name: directus_presets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_presets" (
    "id" integer NOT NULL,
    "bookmark" character varying(255),
    "user" "uuid",
    "role" "uuid",
    "collection" character varying(64),
    "search" character varying(100),
    "layout" character varying(100) DEFAULT 'tabular'::character varying,
    "layout_query" "json",
    "layout_options" "json",
    "refresh_interval" integer,
    "filter" "json"
);


--
-- Name: directus_presets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."directus_presets_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: directus_presets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."directus_presets_id_seq" OWNED BY "public"."directus_presets"."id";


--
-- Name: directus_relations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_relations" (
    "id" integer NOT NULL,
    "many_collection" character varying(64) NOT NULL,
    "many_field" character varying(64) NOT NULL,
    "one_collection" character varying(64),
    "one_field" character varying(64),
    "one_collection_field" character varying(64),
    "one_allowed_collections" "text",
    "junction_field" character varying(64),
    "sort_field" character varying(64),
    "one_deselect_action" character varying(255) DEFAULT 'nullify'::character varying NOT NULL
);


--
-- Name: directus_relations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."directus_relations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: directus_relations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."directus_relations_id_seq" OWNED BY "public"."directus_relations"."id";


--
-- Name: directus_revisions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_revisions" (
    "id" integer NOT NULL,
    "activity" integer NOT NULL,
    "collection" character varying(64) NOT NULL,
    "item" character varying(255) NOT NULL,
    "data" "json",
    "delta" "json",
    "parent" integer
);


--
-- Name: directus_revisions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."directus_revisions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: directus_revisions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."directus_revisions_id_seq" OWNED BY "public"."directus_revisions"."id";


--
-- Name: directus_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_roles" (
    "id" "uuid" NOT NULL,
    "name" character varying(100) NOT NULL,
    "icon" character varying(30) DEFAULT 'supervised_user_circle'::character varying NOT NULL,
    "description" "text",
    "ip_access" "text",
    "enforce_tfa" boolean DEFAULT false NOT NULL,
    "admin_access" boolean DEFAULT false NOT NULL,
    "app_access" boolean DEFAULT true NOT NULL
);


--
-- Name: directus_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_sessions" (
    "token" character varying(64) NOT NULL,
    "user" "uuid" NOT NULL,
    "expires" timestamp with time zone NOT NULL,
    "ip" character varying(255),
    "user_agent" character varying(255),
    "data" "json"
);


--
-- Name: directus_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_settings" (
    "id" integer NOT NULL,
    "project_name" character varying(100) DEFAULT 'Directus'::character varying NOT NULL,
    "project_url" character varying(255),
    "project_color" character varying(10) DEFAULT '#00C897'::character varying,
    "project_logo" "uuid",
    "public_foreground" "uuid",
    "public_background" "uuid",
    "public_note" "text",
    "auth_login_attempts" integer DEFAULT 25,
    "auth_password_policy" character varying(100),
    "storage_asset_transform" character varying(7) DEFAULT 'all'::character varying,
    "storage_asset_presets" "json",
    "custom_css" "text",
    "storage_default_folder" "uuid",
    "basemaps" "json",
    "mapbox_key" character varying(255),
    "module_bar" "json"
);


--
-- Name: directus_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."directus_settings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: directus_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."directus_settings_id_seq" OWNED BY "public"."directus_settings"."id";


--
-- Name: directus_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_users" (
    "id" "uuid" NOT NULL,
    "first_name" character varying(50),
    "last_name" character varying(50),
    "email" character varying(128),
    "password" character varying(255),
    "location" character varying(255),
    "title" character varying(50),
    "description" "text",
    "tags" "json",
    "avatar" "uuid",
    "language" character varying(8) DEFAULT 'en-US'::character varying,
    "theme" character varying(20) DEFAULT 'auto'::character varying,
    "tfa_secret" character varying(255),
    "status" character varying(16) DEFAULT 'active'::character varying NOT NULL,
    "role" "uuid",
    "token" character varying(255),
    "last_access" timestamp with time zone,
    "last_page" character varying(255),
    "provider" character varying(128) DEFAULT 'default'::character varying NOT NULL,
    "external_identifier" character varying(255),
    "auth_data" "json"
);


--
-- Name: directus_webhooks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_webhooks" (
    "id" integer NOT NULL,
    "name" character varying(255) NOT NULL,
    "method" character varying(10) DEFAULT 'POST'::character varying NOT NULL,
    "url" "text" NOT NULL,
    "status" character varying(10) DEFAULT 'active'::character varying NOT NULL,
    "data" boolean DEFAULT true NOT NULL,
    "actions" character varying(100) NOT NULL,
    "collections" "text" NOT NULL,
    "headers" "json"
);


--
-- Name: directus_webhooks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."directus_webhooks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: directus_webhooks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."directus_webhooks_id_seq" OWNED BY "public"."directus_webhooks"."id";


--
-- Name: document; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."document" (
    "id" integer NOT NULL,
    "status" character varying(255) DEFAULT 'draft'::character varying NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "document" "uuid" NOT NULL,
    "title" character varying(255) NOT NULL,
    "description" "text",
    "tags" "jsonb"
);


--
-- Name: document_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."document_category" (
    "id" integer NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "name" character varying(255) NOT NULL
);


--
-- Name: document_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."document_category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: document_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."document_category_id_seq" OWNED BY "public"."document_category"."id";


--
-- Name: document_category_pivot; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."document_category_pivot" (
    "id" integer NOT NULL,
    "document_id" integer NOT NULL,
    "document_category_id" integer NOT NULL
);


--
-- Name: document_category_pivot_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."document_category_pivot_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: document_category_pivot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."document_category_pivot_id_seq" OWNED BY "public"."document_category_pivot"."id";


--
-- Name: document_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."document_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: document_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."document_id_seq" OWNED BY "public"."document"."id";


--
-- Name: image; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."image" (
    "id" integer NOT NULL,
    "status" character varying(255) DEFAULT 'draft'::character varying NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "image" "uuid" NOT NULL,
    "title" character varying(255) NOT NULL,
    "description" "text",
    "tags" "jsonb"
);


--
-- Name: image_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."image_category" (
    "id" integer NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "name" character varying(255) NOT NULL
);


--
-- Name: image_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."image_category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: image_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."image_category_id_seq" OWNED BY "public"."image_category"."id";


--
-- Name: image_category_pivot; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."image_category_pivot" (
    "id" integer NOT NULL,
    "image_id" integer NOT NULL,
    "image_category_id" integer NOT NULL
);


--
-- Name: image_category_pivot_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."image_category_pivot_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: image_category_pivot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."image_category_pivot_id_seq" OWNED BY "public"."image_category_pivot"."id";


--
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."image_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."image_id_seq" OWNED BY "public"."image"."id";


--
-- Name: institute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."institute" (
    "id" integer NOT NULL,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "phone_number" character varying(255) NOT NULL,
    "email_address" character varying(255) NOT NULL,
    "institute_name" character varying(255)
);


--
-- Name: institute_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."institute_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: institute_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."institute_id_seq" OWNED BY "public"."institute"."id";


--
-- Name: menu; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."menu" (
    "id" integer NOT NULL,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "title" character varying(255) NOT NULL,
    "items" "json"
);


--
-- Name: menu_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."menu_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."menu_id_seq" OWNED BY "public"."menu"."id";


--
-- Name: page; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."page" (
    "id" integer NOT NULL,
    "status" character varying(255) DEFAULT 'draft'::character varying NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "title" character varying(255) NOT NULL,
    "content" "text" NOT NULL,
    "slug" "text" NOT NULL
);


--
-- Name: page_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."page_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: page_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."page_id_seq" OWNED BY "public"."page"."id";


--
-- Name: question; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."question" (
    "id" integer NOT NULL,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "question" "text" NOT NULL,
    "answer" "text",
    "question_type" integer NOT NULL,
    "visible_on_website" boolean DEFAULT false NOT NULL
);


--
-- Name: question_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."question_category" (
    "id" integer NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "name" character varying(255) NOT NULL,
    "visible_on_website" boolean DEFAULT false NOT NULL
);


--
-- Name: question_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."question_category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: question_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."question_category_id_seq" OWNED BY "public"."question_category"."id";


--
-- Name: question_category_pivot; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."question_category_pivot" (
    "id" integer NOT NULL,
    "question_id" integer NOT NULL,
    "question_category_id" integer NOT NULL
);


--
-- Name: question_category_pivot_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."question_category_pivot_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: question_category_pivot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."question_category_pivot_id_seq" OWNED BY "public"."question_category_pivot"."id";


--
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."question_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."question_id_seq" OWNED BY "public"."question"."id";


--
-- Name: question_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."question_type" (
    "id" integer NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "name" character varying(255) NOT NULL,
    "visible_on_website" boolean DEFAULT false NOT NULL
);


--
-- Name: question_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."question_type_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: question_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."question_type_id_seq" OWNED BY "public"."question_type"."id";


--
-- Name: reaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."reaction" (
    "id" integer NOT NULL,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "type" integer NOT NULL
);


--
-- Name: reaction_entity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."reaction_entity" (
    "id" integer NOT NULL,
    "reaction_id" integer NOT NULL,
    "item" character varying(255) NOT NULL,
    "collection" character varying(255) NOT NULL
);


--
-- Name: reaction_entity_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."reaction_entity_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reaction_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."reaction_entity_id_seq" OWNED BY "public"."reaction_entity"."id";


--
-- Name: reaction_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."reaction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."reaction_id_seq" OWNED BY "public"."reaction"."id";


--
-- Name: reaction_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."reaction_type" (
    "id" integer NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "name" character varying(255) NOT NULL,
    "icon" character varying(255) NOT NULL
);


--
-- Name: reaction_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."reaction_type_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reaction_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."reaction_type_id_seq" OWNED BY "public"."reaction_type"."id";


--
-- Name: section; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."section" (
    "id" character varying(255),
    "sort" integer,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "visible" boolean DEFAULT true NOT NULL,
    "value" "json",
    "page_section" character varying(255)
);


--
-- Name: theme; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."theme" (
    "id" character varying(255),
    "name" character varying(255) NOT NULL
);

--
-- Name: theme_page; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."theme_page" (
    "id" character varying(255),
    "sort" integer,
    "name" character varying(255) NOT NULL,
    "icon" character varying(255),
    "theme" character varying(255)
);


--
-- Name: theme_page_section; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."theme_page_section" (
    "id" character varying(255),
    "sort" integer,
    "page" integer NOT NULL,
    "name" character varying(255) NOT NULL,
    "fields" "json",
    "icon" character varying(255),
    "sortable" boolean DEFAULT true NOT NULL,
    "can_hide" boolean DEFAULT true NOT NULL
);

--
-- Name: video; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."video" (
    "id" integer NOT NULL,
    "status" character varying(255) DEFAULT 'draft'::character varying NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "title" character varying(255) NOT NULL,
    "video" "uuid" NOT NULL,
    "description" "text",
    "subtitle" "uuid",
    "tags" "jsonb"
);


--
-- Name: video_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."video_category" (
    "id" integer NOT NULL,
    "sort" integer,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "name" character varying(255) NOT NULL
);


--
-- Name: video_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."video_category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: video_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."video_category_id_seq" OWNED BY "public"."video_category"."id";


--
-- Name: video_category_pivot; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."video_category_pivot" (
    "id" integer NOT NULL,
    "video_id" integer NOT NULL,
    "video_category_id" integer NOT NULL
);


--
-- Name: video_category_pivot_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."video_category_pivot_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: video_category_pivot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."video_category_pivot_id_seq" OWNED BY "public"."video_category_pivot"."id";


--
-- Name: video_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."video_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: video_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."video_id_seq" OWNED BY "public"."video"."id";


--
-- Name: website; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."website" (
    "id" integer NOT NULL,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "title" character varying(255) NOT NULL,
    "keywords" "json",
    "description" "text" NOT NULL,
    "logo" "uuid",
    "theme" character varying(255)
);


--
-- Name: website_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."website_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: website_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."website_id_seq" OWNED BY "public"."website"."id";


--
-- Name: article id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."article" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."article_id_seq"'::"regclass");


--
-- Name: article_category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."article_category" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."article_category_id_seq"'::"regclass");


--
-- Name: article_category_pivot id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."article_category_pivot" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."article_category_pivot_id_seq"'::"regclass");


--
-- Name: audio id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."audio" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."audio_id_seq"'::"regclass");


--
-- Name: audio_category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."audio_category" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."audio_category_id_seq"'::"regclass");


--
-- Name: audio_category_pivot id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."audio_category_pivot" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."audio_category_pivot_id_seq"'::"regclass");


--
-- Name: book id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."book_id_seq"'::"regclass");


--
-- Name: book_author id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book_author" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."book_author_id_seq"'::"regclass");


--
-- Name: book_category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book_category" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."book_category_id_seq"'::"regclass");


--
-- Name: book_category_pivot id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book_category_pivot" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."book_category_pivot_id_seq"'::"regclass");


--
-- Name: comment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."comment" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."comment_id_seq"'::"regclass");


--
-- Name: comment_entity id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."comment_entity" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."comment_entity_id_seq"'::"regclass");


--
-- Name: directus_activity id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_activity" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."directus_activity_id_seq"'::"regclass");


--
-- Name: directus_fields id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_fields" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."directus_fields_id_seq"'::"regclass");


--
-- Name: directus_permissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_permissions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."directus_permissions_id_seq"'::"regclass");


--
-- Name: directus_presets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_presets" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."directus_presets_id_seq"'::"regclass");


--
-- Name: directus_relations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_relations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."directus_relations_id_seq"'::"regclass");


--
-- Name: directus_revisions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_revisions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."directus_revisions_id_seq"'::"regclass");


--
-- Name: directus_settings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_settings" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."directus_settings_id_seq"'::"regclass");


--
-- Name: directus_webhooks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_webhooks" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."directus_webhooks_id_seq"'::"regclass");


--
-- Name: document id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."document" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."document_id_seq"'::"regclass");


--
-- Name: document_category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."document_category" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."document_category_id_seq"'::"regclass");


--
-- Name: document_category_pivot id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."document_category_pivot" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."document_category_pivot_id_seq"'::"regclass");


--
-- Name: image id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."image" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."image_id_seq"'::"regclass");


--
-- Name: image_category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."image_category" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."image_category_id_seq"'::"regclass");


--
-- Name: image_category_pivot id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."image_category_pivot" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."image_category_pivot_id_seq"'::"regclass");


--
-- Name: institute id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."institute" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."institute_id_seq"'::"regclass");


--
-- Name: menu id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."menu" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."menu_id_seq"'::"regclass");


--
-- Name: page id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."page" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."page_id_seq"'::"regclass");


--
-- Name: question id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."question_id_seq"'::"regclass");


--
-- Name: question_category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question_category" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."question_category_id_seq"'::"regclass");


--
-- Name: question_category_pivot id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question_category_pivot" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."question_category_pivot_id_seq"'::"regclass");


--
-- Name: question_type id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question_type" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."question_type_id_seq"'::"regclass");


--
-- Name: reaction id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reaction" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."reaction_id_seq"'::"regclass");


--
-- Name: reaction_entity id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reaction_entity" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."reaction_entity_id_seq"'::"regclass");


--
-- Name: reaction_type id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reaction_type" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."reaction_type_id_seq"'::"regclass");


--
-- Name: section id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."section" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."section_id_seq"'::"regclass");


--
-- Name: theme id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."theme" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."theme_id_seq"'::"regclass");


--
-- Name: theme_page id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."theme_page" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."theme_page_id_seq"'::"regclass");


--
-- Name: theme_page_section id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."theme_page_section" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."theme_page_section_id_seq"'::"regclass");


--
-- Name: video id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."video" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."video_id_seq"'::"regclass");


--
-- Name: video_category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."video_category" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."video_category_id_seq"'::"regclass");


--
-- Name: video_category_pivot id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."video_category_pivot" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."video_category_pivot_id_seq"'::"regclass");


--
-- Name: website id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."website" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."website_id_seq"'::"regclass");


--
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: article_category; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: article_category_pivot; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: audio; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: audio_category; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: audio_category_pivot; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: book_author; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: book_category; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: book_category_pivot; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: comment_entity; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: directus_activity; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_activity" VALUES (2113, 'login', '2fd80d19-ad9d-47d4-9478-63934f225cf3', '2021-11-22 09:10:29.738557+00', '::ffff:127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0', 'directus_users', '2fd80d19-ad9d-47d4-9478-63934f225cf3', NULL);


--
-- Data for Name: directus_collections; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_collections" VALUES ('image_category', 'category', NULL, NULL, false, false, '[{"language":"en-US","translation":"Category","singular":"Category","plural":"Categories"}]', NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, 2, 'image', 'open');
INSERT INTO "public"."directus_collections" VALUES ('page', 'view_quilt', NULL, NULL, false, false, NULL, 'status', true, 'archived', 'draft', 'sort', 'all', NULL, NULL, 1, NULL, 'open');
INSERT INTO "public"."directus_collections" VALUES ('video', 'videocam', NULL, NULL, false, false, NULL, 'status', true, 'archived', 'draft', 'sort', 'all', NULL, NULL, 3, NULL, 'closed');
INSERT INTO "public"."directus_collections" VALUES ('audio', 'music_note', NULL, NULL, false, false, NULL, 'status', true, 'archived', 'draft', 'sort', 'all', NULL, NULL, 4, NULL, 'closed');
INSERT INTO "public"."directus_collections" VALUES ('image', 'image', NULL, NULL, false, false, NULL, 'status', true, 'archived', 'draft', 'sort', 'all', NULL, NULL, 5, NULL, 'closed');
INSERT INTO "public"."directus_collections" VALUES ('article_category_pivot', 'import_export', NULL, NULL, true, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 1, 'article', 'open');
INSERT INTO "public"."directus_collections" VALUES ('article_category', 'category', NULL, NULL, false, false, '[{"language":"en-US","translation":"Category","singular":"Category","plural":"Categories"}]', NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, 2, 'article', 'open');
INSERT INTO "public"."directus_collections" VALUES ('article', 'article', NULL, NULL, false, false, '[{"language":"en-US","translation":"Post","singular":"Post","plural":"Posts"}]', 'status', true, 'archived', 'draft', 'sort', 'all', NULL, NULL, 2, NULL, 'closed');
INSERT INTO "public"."directus_collections" VALUES ('document', 'text_snippet', NULL, NULL, false, false, NULL, 'status', true, 'archived', 'draft', 'sort', 'all', NULL, NULL, 6, NULL, 'closed');
INSERT INTO "public"."directus_collections" VALUES ('book', 'menu_book', NULL, NULL, false, false, NULL, 'status', true, 'archived', 'draft', 'sort', 'all', NULL, NULL, 7, NULL, 'closed');
INSERT INTO "public"."directus_collections" VALUES ('comment', 'comment', NULL, NULL, false, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 9, NULL, 'closed');
INSERT INTO "public"."directus_collections" VALUES ('document_category_pivot', 'import_export', NULL, NULL, true, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 1, 'document', 'open');
INSERT INTO "public"."directus_collections" VALUES ('document_category', 'category', NULL, NULL, false, false, '[{"language":"en-US","translation":"Category","singular":"Category","plural":"Categories"}]', NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, 2, 'document', 'open');
INSERT INTO "public"."directus_collections" VALUES ('reaction', 'thumb_up', NULL, NULL, false, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 10, NULL, 'closed');
INSERT INTO "public"."directus_collections" VALUES ('video_category_pivot', 'import_export', NULL, NULL, true, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 1, 'video', 'open');
INSERT INTO "public"."directus_collections" VALUES ('video_category', 'category', NULL, NULL, false, false, '[{"language":"en-US","translation":"Category","singular":"Category","plural":"Categories"}]', NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, 2, 'video', 'open');
INSERT INTO "public"."directus_collections" VALUES ('question', 'email', NULL, NULL, false, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 8, NULL, 'closed');
INSERT INTO "public"."directus_collections" VALUES ('menu', 'widgets', NULL, NULL, true, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 12, NULL, 'open');
INSERT INTO "public"."directus_collections" VALUES ('website', 'language', NULL, NULL, true, true, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 11, NULL, 'open');
INSERT INTO "public"."directus_collections" VALUES ('institute', 'location_city', NULL, NULL, true, true, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 13, NULL, 'open');
INSERT INTO "public"."directus_collections" VALUES ('audio_category_pivot', 'import_export', NULL, NULL, true, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 1, 'audio', 'open');
INSERT INTO "public"."directus_collections" VALUES ('audio_category', 'category', NULL, NULL, false, false, '[{"language":"en-US","translation":"Category","singular":"Category","plural":"Categories"}]', NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, 2, 'audio', 'open');
INSERT INTO "public"."directus_collections" VALUES ('book_category_pivot', 'import_export', NULL, NULL, true, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 1, 'book', 'open');
INSERT INTO "public"."directus_collections" VALUES ('comment_entity', 'import_export', NULL, NULL, true, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 1, 'comment', 'open');
INSERT INTO "public"."directus_collections" VALUES ('image_category_pivot', 'import_export', NULL, NULL, true, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 1, 'image', 'open');
INSERT INTO "public"."directus_collections" VALUES ('book_author', 'perm_identity', NULL, NULL, false, false, '[{"language":"en-US","translation":"Author","singular":"Author","plural":"Authors"}]', NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, 3, 'book', 'open');
INSERT INTO "public"."directus_collections" VALUES ('section', NULL, NULL, NULL, true, false, NULL, NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, 17, NULL, 'open');
INSERT INTO "public"."directus_collections" VALUES ('book_category', 'category', NULL, NULL, false, false, '[{"language":"en-US","translation":"Category","singular":"Category","plural":"Categories"}]', NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, 2, 'book', 'open');
INSERT INTO "public"."directus_collections" VALUES ('reaction_entity', 'import_export', NULL, NULL, true, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 1, 'reaction', 'open');
INSERT INTO "public"."directus_collections" VALUES ('reaction_type', 'emoji_emotions', NULL, NULL, false, false, '[{"language":"en-US","translation":"Type","singular":"Type","plural":"Types"}]', NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, 2, 'reaction', 'open');
INSERT INTO "public"."directus_collections" VALUES ('question_category_pivot', 'import_export', NULL, NULL, true, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 1, 'question', 'open');
INSERT INTO "public"."directus_collections" VALUES ('theme', 'format_paint', NULL, '{{name}}', true, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, 14, NULL, 'open');
INSERT INTO "public"."directus_collections" VALUES ('theme_page', NULL, NULL, NULL, true, false, NULL, NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, 15, NULL, 'open');
INSERT INTO "public"."directus_collections" VALUES ('theme_page_section', NULL, NULL, NULL, true, false, NULL, NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, 16, NULL, 'open');
INSERT INTO "public"."directus_collections" VALUES ('question_type', 'contact_support', NULL, NULL, false, false, '[{"language":"en-US","translation":"Type","singular":"Type","plural":"Types"}]', NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, 3, 'question', 'open');
INSERT INTO "public"."directus_collections" VALUES ('question_category', 'category', NULL, NULL, false, false, '[{"language":"en-US","translation":"Category","singular":"Category","plural":"Categories"}]', NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, 2, 'question', 'open');


--
-- Data for Name: directus_dashboards; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: directus_fields; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_fields" VALUES (431, 'page', 'slug', NULL, 'input', '{"placeholder":"Slug","iconLeft":"settings_ethernet","slug":true,"trim":true}', 'slug', NULL, false, false, 8, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (432, 'menu', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (434, 'menu', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 3, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (435, 'menu', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 4, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (436, 'menu', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 5, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (18, 'article', 'featured_image', NULL, 'file-image', NULL, 'image', NULL, false, false, 10, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (154, 'video', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, 3, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (155, 'video', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 4, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (12, 'article', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 4, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (159, 'video_category', 'id', NULL, 'input', NULL, NULL, NULL, true, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (160, 'video_category', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (161, 'video_category', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (162, 'video_category', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (163, 'video_category', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (164, 'video_category', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (13, 'article', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 5, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (15, 'article', 'title', NULL, 'input', '{"placeholder":"Title","iconLeft":"title","trim":true}', 'raw', NULL, false, false, 8, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (14, 'article', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 6, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (9, 'article', 'status', NULL, 'select-dropdown', '{"choices":[{"text":"$t:published","value":"published"},{"text":"$t:draft","value":"draft"},{"text":"$t:archived","value":"archived"}]}', 'labels', '{"showAsDot":true,"choices":[{"background":"#00C897","value":"published"},{"background":"#D3DAE4","value":"draft"},{"background":"#F7971C","value":"archived"}]}', false, false, 7, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (151, 'article', 'categories', 'm2m', 'list-m2m', '{"template":"{{name}}"}', NULL, NULL, false, false, 12, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (152, 'video', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (433, 'menu', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 2, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (156, 'video', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 5, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (440, 'theme_page', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (441, 'theme_page', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, 2, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (104, 'article_category', 'id', NULL, 'input', NULL, NULL, NULL, true, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (448, 'theme_page_section', 'name', NULL, 'input', '{"fields":[],"placeholder":"Name","iconLeft":"title","trim":true}', 'formatted-json-value', NULL, false, false, 4, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (105, 'article_category', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (106, 'article_category', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (107, 'article_category', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (108, 'article_category', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (109, 'article_category', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (110, 'article_category', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title"}', 'raw', NULL, false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (455, 'section', 'visible', 'boolean', 'boolean', NULL, 'boolean', '{"labelOn":"Visible","labelOff":"Invisible","iconOn":"visibility","iconOff":"visibility_off"}', false, true, 5, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (179, 'audio', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 5, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (180, 'audio', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 6, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (176, 'audio', 'status', NULL, 'select-dropdown', '{"choices":[{"text":"$t:published","value":"published"},{"text":"$t:draft","value":"draft"},{"text":"$t:archived","value":"archived"}]}', 'labels', '{"showAsDot":true,"choices":[{"background":"#00C897","value":"published"},{"background":"#D3DAE4","value":"draft"},{"background":"#F7971C","value":"archived"}]}', false, false, 2, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (177, 'audio', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, 3, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (178, 'audio', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 4, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (157, 'video', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 6, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (8, 'article', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (10, 'article', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, 2, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (166, 'video', 'title', NULL, 'input', '{"placeholder":"Title","iconLeft":"title"}', NULL, NULL, false, false, 9, 'half', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (170, 'video_category', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title"}', NULL, NULL, false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (11, 'article', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 3, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (153, 'video', 'status', NULL, 'select-dropdown', '{"choices":[{"text":"$t:published","value":"published"},{"text":"$t:draft","value":"draft"},{"text":"$t:archived","value":"archived"}]}', 'labels', '{"showAsDot":true,"choices":[{"background":"#00C897","value":"published"},{"background":"#D3DAE4","value":"draft"},{"background":"#F7971C","value":"archived"}]}', false, false, 2, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (158, 'video', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 7, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (167, 'video', 'video', 'file', 'file', NULL, 'file', NULL, false, false, 8, 'half', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (169, 'video', 'subtitle', 'file', 'file', NULL, 'file', NULL, false, false, 10, 'full', NULL, NULL, '[{"name":"MP4 only","rule":{"video":{"type":{"_contains":"video/mp4"}}}}]', false, NULL);
INSERT INTO "public"."directus_fields" VALUES (168, 'video', 'description', NULL, 'input-multiline', '{"placeholder":"Description","trim":true}', 'raw', NULL, false, false, 11, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (171, 'video', 'categories', 'm2m', 'list-m2m', '{"template":"{{name}}"}', NULL, NULL, false, false, 13, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (172, 'video_category_pivot', 'id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (173, 'video_category_pivot', 'video_id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (174, 'video_category_pivot', 'video_category_id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (175, 'audio', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (182, 'audio_category', 'id', NULL, 'input', NULL, NULL, NULL, true, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (183, 'audio_category', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (184, 'audio_category', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (185, 'audio_category', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (186, 'audio_category', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (187, 'audio_category', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (188, 'audio_category', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title","trim":true}', 'raw', NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (200, 'image', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 5, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (201, 'image', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 6, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (190, 'audio', 'audio', 'file', 'file', NULL, 'file', NULL, false, false, 8, 'half', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (189, 'audio', 'title', NULL, 'input', '{"placeholder":"Title","iconLeft":"title","trim":true}', 'raw', NULL, false, false, 9, 'half', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (191, 'audio', 'description', NULL, 'input-multiline', '{"trim":true}', 'raw', NULL, false, false, 10, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (193, 'audio_category_pivot', 'id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (194, 'audio_category_pivot', 'audio_id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (195, 'audio_category_pivot', 'audio_category_id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (203, 'image_category', 'id', NULL, 'input', NULL, NULL, NULL, true, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (204, 'image_category', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (205, 'image_category', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (206, 'image_category', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (207, 'image_category', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (208, 'image_category', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (209, 'image_category', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title","trim":true}', 'raw', NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (202, 'image', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 7, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (210, 'image', 'image', 'file', 'file-image', NULL, 'image', NULL, false, false, 8, 'half', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (214, 'image_category_pivot', 'id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (215, 'image_category_pivot', 'image_id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (216, 'image_category_pivot', 'image_category_id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (211, 'image', 'title', NULL, 'input', '{"placeholder":"Title","iconLeft":"title"}', 'raw', NULL, false, false, 9, 'half', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (198, 'image', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, 3, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (212, 'image', 'description', NULL, 'input-multiline', '{"trim":true,"placeholder":"Description"}', NULL, NULL, false, false, 10, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (229, 'book_category', 'id', NULL, 'input', NULL, NULL, NULL, true, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (230, 'book_category', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (231, 'book_category', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (232, 'book_category', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (233, 'book_category', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (234, 'book_category', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (235, 'book_category', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title","trim":true}', 'raw', NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (437, 'menu', 'title', NULL, 'input', '{"placeholder":"Title","iconLeft":"title"}', NULL, NULL, false, false, 6, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (199, 'image', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 4, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (220, 'book', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 4, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (219, 'book', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, 3, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (213, 'image', 'categories', 'm2m', 'list-m2m', '{"template":"{{name}}"}', NULL, NULL, false, false, 12, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (443, 'theme_page', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title","trim":true}', NULL, NULL, false, false, 3, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (456, 'section', 'value', 'json', NULL, NULL, 'formatted-json-value', NULL, false, false, 7, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (445, 'theme_page_section', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, 2, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (476, 'audio_category', 'audios', 'm2m', 'list-m2m', '{"template":"{{audio_id.title}}{{audio_id.date_created}}"}', 'related-values', '{"template":"{{audio_id.title}}{{audio_id.date_created}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (444, 'theme_page_section', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (248, 'book_author', 'id', NULL, 'input', NULL, NULL, NULL, true, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (249, 'book_author', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (250, 'book_author', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (251, 'book_author', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (252, 'book_author', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (253, 'book_author', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (254, 'book_author', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title","trim":true}', 'raw', NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (255, 'book_author', 'photo', 'file', 'file-image', NULL, 'image', NULL, false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (258, 'book_category_pivot', 'id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (259, 'book_category_pivot', 'book_id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (260, 'book_category_pivot', 'book_category_id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (223, 'book', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 7, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (256, 'book', 'name', NULL, 'input', '{"placeholder":"name","iconLeft":"title","trim":true}', 'raw', NULL, false, false, 9, 'half', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (261, 'book', 'description', NULL, 'input-multiline', '{"trim":true}', NULL, NULL, false, false, 11, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (257, 'book', 'categories', 'm2m', 'list-m2m', '{"template":"{{name}}"}', NULL, NULL, false, false, 13, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (221, 'book', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 5, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (181, 'audio', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 7, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (222, 'book', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 6, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (192, 'audio', 'categories', 'm2m', 'list-m2m', '{"template":"{{name}}"}', NULL, NULL, false, false, 12, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (196, 'image', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (299, 'comment', 'parent', 'm2o', 'select-dropdown-m2o', '{"template":"{{user_created}}{{comment}}"}', NULL, NULL, false, false, 6, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (290, 'comment', 'comment', NULL, 'input-multiline', NULL, 'raw', NULL, false, false, 7, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (291, 'comment', 'approved', 'boolean', 'boolean', '{"label":"Approved"}', NULL, NULL, false, false, 8, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (438, 'menu', 'items', 'json', 'menu', NULL, 'formatted-json-value', NULL, false, false, 7, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (457, 'theme_page', 'icon', NULL, 'select-icon', NULL, 'icon', NULL, false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (218, 'book', 'status', NULL, 'select-dropdown', '{"choices":[{"text":"$t:published","value":"published"},{"text":"$t:draft","value":"draft"},{"text":"$t:archived","value":"archived"}]}', 'labels', '{"showAsDot":true,"choices":[{"background":"#00C897","value":"published"},{"background":"#D3DAE4","value":"draft"},{"background":"#F7971C","value":"archived"}]}', false, false, 2, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (262, 'book', 'book', 'file', 'file', NULL, 'file', NULL, false, false, 8, 'half', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (263, 'book', 'author', 'm2o', 'select-dropdown-m2o', '{"template":"{{photo}}{{name}}"}', NULL, NULL, false, false, 10, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (309, 'question', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 2, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (271, 'document_category', 'id', NULL, 'input', NULL, NULL, NULL, true, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (272, 'document_category', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (273, 'document_category', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (274, 'document_category', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (275, 'document_category', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (276, 'document_category', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (277, 'document_category', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title","trim":true}', 'raw', NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (279, 'document', 'title', NULL, 'input', NULL, 'raw', NULL, false, false, 9, 'half', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (280, 'document', 'description', NULL, 'input-multiline', '{"trim":true}', 'raw', NULL, false, false, 10, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (282, 'document_category_pivot', 'id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (283, 'document_category_pivot', 'document_id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (284, 'document_category_pivot', 'document_category_id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (293, 'comment_entity', 'id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (294, 'comment_entity', 'comment_id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (295, 'comment_entity', 'item', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (296, 'comment_entity', 'collection', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (477, 'image_category', 'images', 'm2m', 'list-m2m', '{"template":"{{image_id.title}}{{image_id.date_created}}"}', 'related-values', '{"template":"{{image_id.title}}{{image_id.date_created}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (317, 'question_type', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title","trim":true}', 'raw', '{}', false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (285, 'comment', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (286, 'comment', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 2, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (287, 'comment', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 3, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (289, 'comment', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 4, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (292, 'comment', 'entity', 'm2a', 'list-m2a', '{"enableCreate":false}', NULL, NULL, false, false, 5, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (311, 'question_type', 'id', NULL, 'input', NULL, NULL, NULL, true, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (312, 'question_type', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (313, 'question_type', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (314, 'question_type', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (315, 'question_type', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (316, 'question_type', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (322, 'reaction_type', 'id', NULL, 'input', NULL, NULL, NULL, true, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (323, 'reaction_type', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (324, 'reaction_type', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (325, 'reaction_type', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (326, 'reaction_type', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (327, 'reaction_type', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (328, 'reaction_type', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title","trim":true}', NULL, NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (329, 'reaction_type', 'icon', NULL, 'input', '{"placeholder":"Icon","iconLeft":"insert_emoticon","trim":true}', NULL, NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (330, 'reaction', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (264, 'document', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (265, 'document', 'status', NULL, 'select-dropdown', '{"choices":[{"text":"$t:published","value":"published"},{"text":"$t:draft","value":"draft"},{"text":"$t:archived","value":"archived"}]}', 'labels', '{"showAsDot":true,"choices":[{"background":"#00C897","value":"published"},{"background":"#D3DAE4","value":"draft"},{"background":"#F7971C","value":"archived"}]}', false, false, 2, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (266, 'document', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, 3, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (267, 'document', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 4, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (268, 'document', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 5, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (269, 'document', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 6, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (270, 'document', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 7, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (278, 'document', 'document', 'file', 'file', NULL, 'file', NULL, false, false, 8, 'half', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (281, 'document', 'categories', 'm2m', 'list-m2m', '{"template":"{{name}}"}', NULL, NULL, false, false, 12, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (217, 'book', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (310, 'question', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 3, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (319, 'question', 'question', NULL, 'input-multiline', '{"trim":true}', NULL, NULL, false, false, 5, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (308, 'question', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (335, 'reaction_entity', 'id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (336, 'reaction_entity', 'reaction_id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (337, 'reaction_entity', 'item', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (338, 'reaction_entity', 'collection', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (331, 'reaction', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 2, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (332, 'reaction', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 3, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (334, 'reaction', 'entity', 'm2a', 'list-m2a', '{"enableCreate":false}', 'raw', NULL, false, false, 4, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (333, 'reaction', 'type', 'm2o', 'select-dropdown-m2o', '{"template":"{{name}}"}', NULL, NULL, false, false, 5, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (471, 'theme', 'pages', 'o2m', 'list-o2m', '{"template":"{{name}}"}', 'related-values', '{"template":"{{name}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (394, 'website', 'theme', 'm2o', 'select-dropdown-m2o', '{"template":"{{name}}"}', NULL, NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (371, 'article', 'tags', 'json', 'tags', '{"placeholder":"Tags","allowCustom":true,"iconLeft":"local_offer"}', 'labels', NULL, false, false, 11, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (372, 'video', 'tags', 'json', 'tags', '{"placeholder":"Tags","iconLeft":"local_offer"}', NULL, NULL, false, false, 12, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (339, 'institute', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (340, 'institute', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 2, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (341, 'institute', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 3, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (347, 'institute', 'institute_name', NULL, 'input', '{"placeholder":"Institute Name","iconLeft":"title","trim":true}', NULL, NULL, false, false, 4, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (344, 'institute', 'phone_number', NULL, 'input', '{"placeholder":"Phone Number","iconLeft":"phone","trim":true}', NULL, NULL, false, false, 5, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (345, 'institute', 'email_address', NULL, 'input', '{"placeholder":"Email Address","iconLeft":"alternate_email","trim":true}', NULL, NULL, false, false, 6, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (348, 'theme', 'id', NULL, 'input', NULL, NULL, NULL, true, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (349, 'theme', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title","trim":true}', NULL, NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (356, 'question_category', 'id', NULL, 'input', NULL, NULL, NULL, true, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (357, 'question_category', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (358, 'question_category', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (359, 'question_category', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (360, 'question_category', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (361, 'question_category', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (362, 'question_category', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title","trim":true}', NULL, NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (364, 'question_category_pivot', 'id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (365, 'question_category_pivot', 'question_id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (366, 'question_category_pivot', 'question_category_id', NULL, NULL, NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (478, 'document_category', 'documents', 'm2m', 'list-m2m', '{"template":"{{document_id.title}}{{document_id.date_created}}"}', 'related-values', '{"template":"{{document_id.title}}{{document_id.date_created}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (381, 'website', 'id', NULL, 'input', NULL, NULL, NULL, true, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (373, 'audio', 'tags', 'json', 'tags', '{"placeholder":"Tags","iconLeft":"local_offer"}', NULL, NULL, false, false, 11, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (197, 'image', 'status', NULL, 'select-dropdown', '{"choices":[{"text":"$t:published","value":"published"},{"text":"$t:draft","value":"draft"},{"text":"$t:archived","value":"archived"}]}', 'labels', '{"showAsDot":true,"choices":[{"background":"#00C897","value":"published"},{"background":"#D3DAE4","value":"draft"},{"background":"#F7971C","value":"archived"}]}', false, false, 2, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (374, 'image', 'tags', 'json', 'tags', '{"placeholder":"Tags","iconLeft":"local_offer"}', NULL, NULL, false, false, 11, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (375, 'document', 'tags', 'json', 'tags', '{"placeholder":"Tags","iconLeft":"local_offer"}', NULL, NULL, false, false, 11, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (376, 'book', 'tags', 'json', 'tags', '{"placeholder":"tags","iconLeft":"local_offer"}', NULL, NULL, false, false, 12, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (390, 'question', 'visible_on_website', 'boolean', 'boolean', '{"iconOn":"visibility","iconOff":"visibility_off","label":"Visible"}', NULL, NULL, false, false, 7, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (391, 'question_category', 'visible_on_website', 'boolean', 'boolean', '{"iconOn":"visibility","iconOff":"visibility_off","label":"Visible"}', NULL, NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (382, 'website', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (383, 'website', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (384, 'website', 'title', NULL, 'input', '{"placeholder":"Title","iconLeft":"title","trim":true}', NULL, NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (385, 'website', 'keywords', 'json', 'tags', '{"placeholder":"Keywords","iconLeft":"local_offer"}', NULL, NULL, false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (480, 'book_author', 'books', 'o2m', 'list-o2m', '{"template":"{{name}}{{date_created}}"}', 'related-values', '{"template":"{{name}}{{date_created}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (389, 'question_type', 'visible_on_website', 'boolean', 'boolean', '{"label":"Visible"}', NULL, NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (377, 'question', 'question_type', 'm2o', 'select-dropdown-m2o', '{"template":"{{name}}"}', NULL, NULL, false, false, 4, 'full', '[{"language":"en-US","translation":"Type"}]', NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (363, 'question', 'categories', 'm2m', 'list-m2m', '{"template":"{{name}}"}', NULL, NULL, false, false, 8, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (447, 'theme_page_section', 'page', 'm2o', 'select-dropdown-m2o', '{"template":"{{name}}{{theme}}"}', 'related-values', '{"template":"{{name}}"}', false, false, 3, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (386, 'website', 'description', NULL, 'input-multiline', '{"placeholder":"Description","trim":true}', NULL, NULL, false, false, NULL, 'half', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (387, 'website', 'logo', 'file', 'file-image', NULL, NULL, NULL, false, false, NULL, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (465, 'theme_page_section', 'sortable', 'boolean', 'boolean', NULL, 'boolean', NULL, false, false, 5, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (458, 'theme_page_section', 'icon', NULL, 'select-icon', NULL, 'icon', NULL, false, false, 7, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (450, 'theme_page_section', 'fields', 'json', NULL, NULL, 'formatted-json-value', NULL, false, false, 8, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (481, 'question_category', 'questions', 'm2m', 'list-m2m', '{"template":"{{question_id.question}}"}', 'related-values', '{"template":"{{question_id.question}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (483, 'reaction_type', 'reactions', 'o2m', 'list-o2m', '{"template":"{{id}}"}', 'related-values', '{"template":"{{id}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (411, 'page', 'title', NULL, 'input', '{"placeholder":"Title","iconLeft":"title","trim":true}', NULL, NULL, false, false, 9, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (418, 'page', 'content', NULL, 'input-rich-text-html', '{
  "tinymceOverrides": {
    "plugins": "preview paste directionality code fullscreen image link media table hr pagebreak insertdatetime lists imagetools",
    "toolbar": "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | customImage customMedia link | ltr rtl | fontselect fontsizeselect formatselect",
    "menubar": "edit view insert format tools table tc",
    "template_cdate_format": "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
    "template_mdate_format": "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
    "contextmenu": "link image table",
    "height": 500
  }
}', NULL, NULL, false, false, 10, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (320, 'question', 'answer', NULL, 'input-rich-text-html', '{
  "tinymceOverrides": {
    "plugins": "preview paste directionality code fullscreen image link media table hr pagebreak insertdatetime lists imagetools",
    "toolbar": "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | customImage customMedia link | ltr rtl | fontselect fontsizeselect formatselect",
    "menubar": "edit view insert format tools table tc",
    "template_cdate_format": "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
    "template_mdate_format": "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
    "contextmenu": "link image table",
    "height": 500
  }
}', NULL, NULL, false, false, 6, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (17, 'article', 'content', NULL, 'input-rich-text-html', '{
  "tinymceOverrides": {
    "plugins": "preview paste directionality code fullscreen image link media table hr pagebreak insertdatetime lists imagetools",
    "toolbar": "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | customImage customMedia link | ltr rtl | fontselect fontsizeselect formatselect",
    "menubar": "edit view insert format tools table tc",
    "template_cdate_format": "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
    "template_mdate_format": "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
    "contextmenu": "link image table",
    "height": 500
  }
}', 'raw', NULL, false, false, 9, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (462, 'theme_page', 'theme', 'm2o', 'select-dropdown-m2o', '{"template":"{{name}}"}', 'related-values', '{"template":"{{name}}"}', false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (479, 'book_category', 'books', 'm2m', 'list-m2m', '{"template":"{{book_id.name}}{{book_id.author.name}}"}', 'related-values', '{"template":"{{book_id.name}}{{book_id.author.name}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (482, 'question_type', 'questions', 'o2m', 'list-o2m', '{"template":"{{question}}"}', 'related-values', '{"template":"{{question}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (484, 'theme', 'websites', 'o2m', 'list-o2m', '{"template":"{{title}}"}', 'related-values', '{"template":"{{title}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (404, 'page', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (405, 'page', 'status', NULL, 'select-dropdown', '{"choices":[{"text":"$t:published","value":"published"},{"text":"$t:draft","value":"draft"},{"text":"$t:archived","value":"archived"}]}', 'labels', '{"showAsDot":true,"choices":[{"background":"#00C897","value":"published"},{"background":"#D3DAE4","value":"draft"},{"background":"#F7971C","value":"archived"}]}', false, false, 2, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (406, 'page', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, 3, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (407, 'page', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 4, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (408, 'page', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 5, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (409, 'page', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 6, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (410, 'page', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 7, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (451, 'section', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (464, 'section', 'page_section', 'm2o', 'select-dropdown-m2o', '{"template":"{{name}}"}', 'related-values', '{"template":"{{name}}"}', false, true, 6, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (452, 'section', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, 2, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (453, 'section', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 3, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (454, 'section', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 4, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (467, 'theme_page_section', 'can_hide', 'boolean', 'boolean', '{"label":"Yes"}', 'boolean', NULL, false, false, 6, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (472, 'theme_page', 'sections', 'o2m', 'list-o2m', '{"template":"{{name}}"}', 'related-values', '{"template":"{{name}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (473, 'theme_page_section', 'sections', 'o2m', 'list-o2m', '{"template":"{{id}}{{visible}}"}', 'related-values', '{"template":"{{id}}{{visible}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (474, 'article_category', 'articles', 'm2m', 'list-m2m', '{"template":"{{article_id.title}}{{article_id.date_created}}"}', 'related-values', '{"template":"{{article_id.title}}{{article_id.date_created}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (475, 'video_category', 'videos', 'm2m', 'list-m2m', '{"template":"{{video_id.title}}{{video_id.date_created}}"}', 'related-values', '{"template":"{{video_id.title}}{{video_id.date_created}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);


--
-- Data for Name: directus_files; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: directus_folders; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: directus_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_migrations" VALUES ('20201028A', 'Remove Collection Foreign Keys', '2021-10-25 04:54:36.029484+00');
INSERT INTO "public"."directus_migrations" VALUES ('20201029A', 'Remove System Relations', '2021-10-25 04:54:36.034509+00');
INSERT INTO "public"."directus_migrations" VALUES ('20201029B', 'Remove System Collections', '2021-10-25 04:54:36.038364+00');
INSERT INTO "public"."directus_migrations" VALUES ('20201029C', 'Remove System Fields', '2021-10-25 04:54:36.048196+00');
INSERT INTO "public"."directus_migrations" VALUES ('20201105A', 'Add Cascade System Relations', '2021-10-25 04:54:36.133375+00');
INSERT INTO "public"."directus_migrations" VALUES ('20201105B', 'Change Webhook URL Type', '2021-10-25 04:54:36.14916+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210225A', 'Add Relations Sort Field', '2021-10-25 04:54:36.154457+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210304A', 'Remove Locked Fields', '2021-10-25 04:54:36.159071+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210312A', 'Webhooks Collections Text', '2021-10-25 04:54:36.167166+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210331A', 'Add Refresh Interval', '2021-10-25 04:54:36.171399+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210415A', 'Make Filesize Nullable', '2021-10-25 04:54:36.17931+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210416A', 'Add Collections Accountability', '2021-10-25 04:54:36.185194+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210422A', 'Remove Files Interface', '2021-10-25 04:54:36.190537+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210506A', 'Rename Interfaces', '2021-10-25 04:54:36.239283+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210510A', 'Restructure Relations', '2021-10-25 04:54:36.267575+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210518A', 'Add Foreign Key Constraints', '2021-10-25 04:54:36.283519+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210519A', 'Add System Fk Triggers', '2021-10-25 04:54:36.329644+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210521A', 'Add Collections Icon Color', '2021-10-25 04:54:36.33525+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210525A', 'Add Insights', '2021-10-25 04:54:36.368104+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210608A', 'Add Deep Clone Config', '2021-10-25 04:54:36.371293+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210626A', 'Change Filesize Bigint', '2021-10-25 04:54:36.387759+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210716A', 'Add Conditions to Fields', '2021-10-25 04:54:36.392457+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210721A', 'Add Default Folder', '2021-10-25 04:54:36.400069+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210802A', 'Replace Groups', '2021-10-25 04:54:36.404238+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210803A', 'Add Required to Fields', '2021-10-25 04:54:36.408005+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210805A', 'Update Groups', '2021-10-25 04:54:36.411392+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210805B', 'Change Image Metadata Structure', '2021-10-25 04:54:36.414579+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210811A', 'Add Geometry Config', '2021-10-25 04:54:36.418331+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210831A', 'Remove Limit Column', '2021-10-25 04:54:36.422173+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210903A', 'Add Auth Provider', '2021-10-25 04:54:36.442705+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210907A', 'Webhooks Collections Not Null', '2021-10-25 04:54:36.451047+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210910A', 'Move Module Setup', '2021-10-25 04:54:36.457779+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210920A', 'Webhooks URL Not Null', '2021-10-25 04:54:36.46564+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210924A', 'Add Collection Organization', '2021-10-25 04:54:36.472765+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210927A', 'Replace Fields Group', '2021-10-25 04:54:36.482175+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210927B', 'Replace M2M Interface', '2021-10-25 04:54:36.485254+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210929A', 'Rename Login Action', '2021-10-25 04:54:36.488739+00');
INSERT INTO "public"."directus_migrations" VALUES ('20211007A', 'Update Presets', '2021-10-25 04:54:36.49768+00');
INSERT INTO "public"."directus_migrations" VALUES ('20211009A', 'Add Auth Data', '2021-10-25 04:54:36.50129+00');
INSERT INTO "public"."directus_migrations" VALUES ('20211016A', 'Add Webhook Headers', '2021-10-31 04:57:32.689869+00');
INSERT INTO "public"."directus_migrations" VALUES ('20211103A', 'Set Unique to User Token', '2021-11-04 07:33:42.503066+00');
INSERT INTO "public"."directus_migrations" VALUES ('20211103B', 'Update Special Geometry', '2021-11-07 06:48:43.437101+00');
INSERT INTO "public"."directus_migrations" VALUES ('20211104A', 'Remove Collections Listing', '2021-11-07 06:48:43.448991+00');


--
-- Data for Name: directus_panels; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: directus_permissions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: directus_presets; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_presets" VALUES (60, NULL, '2fd80d19-ad9d-47d4-9478-63934f225cf3', NULL, 'page', NULL, 'tabular', '{"tabular":{"page":1}}', NULL, NULL, NULL);


--
-- Data for Name: directus_relations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_relations" VALUES (137, 'menu', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (138, 'menu', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (3, 'article', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (4, 'article', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (5, 'article', 'featured_image', 'directus_files', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (141, 'section', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (93, 'document_category', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (94, 'document', 'document', 'directus_files', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (97, 'comment', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (142, 'theme_page', 'theme', 'theme', 'pages', NULL, NULL, NULL, NULL, 'delete');
INSERT INTO "public"."directus_relations" VALUES (140, 'theme_page_section', 'page', 'theme_page', 'sections', NULL, NULL, NULL, NULL, 'delete');
INSERT INTO "public"."directus_relations" VALUES (143, 'section', 'page_section', 'theme_page_section', 'sections', NULL, NULL, NULL, NULL, 'delete');
INSERT INTO "public"."directus_relations" VALUES (51, 'article_category_pivot', 'article_id', 'article', NULL, NULL, NULL, 'article_category_id', NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (99, 'comment_entity', 'item', NULL, NULL, 'collection', 'article,audio,book,document,image,video', 'comment_id', NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (50, 'article_category_pivot', 'article_category_id', 'article_category', 'articles', NULL, NULL, 'article_id', NULL, 'delete');
INSERT INTO "public"."directus_relations" VALUES (59, 'video_category_pivot', 'video_id', 'video', NULL, NULL, NULL, 'video_category_id', NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (100, 'comment_entity', 'comment_id', 'comment', 'entity', NULL, NULL, 'item', NULL, 'delete');
INSERT INTO "public"."directus_relations" VALUES (101, 'comment', 'parent', 'comment', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (58, 'video_category_pivot', 'video_category_id', 'video_category', 'videos', NULL, NULL, 'video_id', NULL, 'delete');
INSERT INTO "public"."directus_relations" VALUES (66, 'audio_category_pivot', 'audio_id', 'audio', NULL, NULL, NULL, 'audio_category_id', NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (52, 'video', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (53, 'video', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (54, 'video_category', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (55, 'video_category', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (56, 'video', 'video', 'directus_files', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (57, 'video', 'subtitle', 'directus_files', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (60, 'audio', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (61, 'audio', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (62, 'audio_category', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (63, 'audio_category', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (64, 'audio', 'audio', 'directus_files', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (67, 'image', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (68, 'image', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (69, 'image_category', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (70, 'image_category', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (71, 'image', 'image', 'directus_files', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (74, 'book', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (75, 'book', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (33, 'article_category', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (34, 'article_category', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (65, 'audio_category_pivot', 'audio_category_id', 'audio_category', 'audios', NULL, NULL, 'audio_id', NULL, 'delete');
INSERT INTO "public"."directus_relations" VALUES (77, 'book_category', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (78, 'book_category', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (73, 'image_category_pivot', 'image_id', 'image', NULL, NULL, NULL, 'image_category_id', NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (72, 'image_category_pivot', 'image_category_id', 'image_category', 'images', NULL, NULL, 'image_id', NULL, 'delete');
INSERT INTO "public"."directus_relations" VALUES (96, 'document_category_pivot', 'document_id', 'document', NULL, NULL, NULL, 'document_category_id', NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (95, 'document_category_pivot', 'document_category_id', 'document_category', 'documents', NULL, NULL, 'document_id', NULL, 'delete');
INSERT INTO "public"."directus_relations" VALUES (83, 'book_author', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (84, 'book_author', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (85, 'book_author', 'photo', 'directus_files', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (88, 'book', 'book', 'directus_files', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (90, 'document', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (91, 'document', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (92, 'document_category', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (87, 'book_category_pivot', 'book_id', 'book', NULL, NULL, NULL, 'book_category_id', NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (105, 'question', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (106, 'question_type', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (107, 'question_type', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (86, 'book_category_pivot', 'book_category_id', 'book_category', 'books', NULL, NULL, 'book_id', NULL, 'delete');
INSERT INTO "public"."directus_relations" VALUES (109, 'reaction_type', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (110, 'reaction_type', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (111, 'reaction', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (113, 'reaction_entity', 'item', NULL, NULL, 'collection', 'article,audio,book,document,image,video', 'reaction_id', NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (114, 'reaction_entity', 'reaction_id', 'reaction', 'entity', NULL, NULL, 'item', NULL, 'delete');
INSERT INTO "public"."directus_relations" VALUES (115, 'institute', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (89, 'book', 'author', 'book_author', 'books', NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (118, 'question_category', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (119, 'question_category', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (121, 'question_category_pivot', 'question_id', 'question', NULL, NULL, NULL, 'question_category_id', NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (120, 'question_category_pivot', 'question_category_id', 'question_category', 'questions', NULL, NULL, 'question_id', NULL, 'delete');
INSERT INTO "public"."directus_relations" VALUES (126, 'website', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (127, 'website', 'logo', 'directus_files', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (123, 'question', 'question_type', 'question_type', 'questions', NULL, NULL, NULL, NULL, 'delete');
INSERT INTO "public"."directus_relations" VALUES (112, 'reaction', 'type', 'reaction_type', 'reactions', NULL, NULL, NULL, NULL, 'delete');
INSERT INTO "public"."directus_relations" VALUES (130, 'website', 'theme', 'theme', 'websites', NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (133, 'page', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (134, 'page', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');


--
-- Data for Name: directus_revisions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: directus_roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_roles" VALUES ('94a2609b-5d4f-41f2-95f3-d92c99f7209d', 'Administrator', 'supervised_user_circle', NULL, NULL, false, true, true);


--
-- Data for Name: directus_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_sessions" VALUES ('wGtjnOb7iSQ38bYpj_Kk4CY-2zFm3eQOwWEUa6K3JpTmc8MuKO2zcoIfTNutLDZ9', '2fd80d19-ad9d-47d4-9478-63934f225cf3', '2021-11-29 09:10:29.732+00', '::ffff:127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0', NULL);


--
-- Data for Name: directus_settings; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_settings" VALUES (1, 'Al-Madrasah', NULL, '#4154F1', NULL, NULL, NULL, NULL, 25, NULL, 'all', NULL, '', NULL, NULL, NULL, '[{"type":"module","id":"content","enabled":true},{"type":"module","id":"files","enabled":true},{"type":"module","id":"users","enabled":true},{"type":"module","id":"insights","enabled":true},{"type":"module","id":"customization","enabled":true},{"type":"module","id":"_settings","enabled":true},{"type":"module","id":"settings","enabled":true,"locked":true}]');


--
-- Data for Name: directus_users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_users" VALUES ('2fd80d19-ad9d-47d4-9478-63934f225cf3', 'SAHARA', 'IT', 'saharaitech2@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$QTARk5/e4/ITU/kx6PPHSA$aq3bNdzI3vlv7QPHy9T4PKIdojAbFJaj4i8rpLDxKyY', NULL, NULL, NULL, NULL, NULL, 'en-US', 'auto', NULL, 'active', '94a2609b-5d4f-41f2-95f3-d92c99f7209d', NULL, '2021-11-22 09:10:29.744+00', '/settings/data-model/theme', 'default', NULL, NULL);


--
-- Data for Name: directus_webhooks; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: document; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: document_category; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: document_category_pivot; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: image; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: image_category; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: image_category_pivot; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: institute; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: page; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: question_category; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: question_category_pivot; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: question_type; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: reaction; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: reaction_entity; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: reaction_type; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: section; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: theme; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: theme_page; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: theme_page_section; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: video; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: video_category; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: video_category_pivot; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: website; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: geocode_settings; Type: TABLE DATA; Schema: tiger; Owner: -
--



--
-- Data for Name: pagc_gaz; Type: TABLE DATA; Schema: tiger; Owner: -
--



--
-- Data for Name: pagc_lex; Type: TABLE DATA; Schema: tiger; Owner: -
--



--
-- Data for Name: pagc_rules; Type: TABLE DATA; Schema: tiger; Owner: -
--



--
-- Data for Name: topology; Type: TABLE DATA; Schema: topology; Owner: -
--



--
-- Data for Name: layer; Type: TABLE DATA; Schema: topology; Owner: -
--



--
-- Name: article_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."article_category_id_seq"', 3, true);


--
-- Name: article_category_pivot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."article_category_pivot_id_seq"', 1, false);


--
-- Name: article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."article_id_seq"', 1, true);


--
-- Name: audio_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."audio_category_id_seq"', 1, false);


--
-- Name: audio_category_pivot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."audio_category_pivot_id_seq"', 1, false);


--
-- Name: audio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."audio_id_seq"', 1, false);


--
-- Name: book_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."book_author_id_seq"', 1, false);


--
-- Name: book_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."book_category_id_seq"', 1, false);


--
-- Name: book_category_pivot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."book_category_pivot_id_seq"', 1, false);


--
-- Name: book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."book_id_seq"', 1, false);


--
-- Name: comment_entity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."comment_entity_id_seq"', 1, false);


--
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."comment_id_seq"', 1, false);


--
-- Name: directus_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_activity_id_seq"', 2113, true);


--
-- Name: directus_fields_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_fields_id_seq"', 484, true);


--
-- Name: directus_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_permissions_id_seq"', 19, true);


--
-- Name: directus_presets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_presets_id_seq"', 60, true);


--
-- Name: directus_relations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_relations_id_seq"', 143, true);


--
-- Name: directus_revisions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_revisions_id_seq"', 2020, true);


--
-- Name: directus_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_settings_id_seq"', 1, true);


--
-- Name: directus_webhooks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_webhooks_id_seq"', 1, false);


--
-- Name: document_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."document_category_id_seq"', 1, false);


--
-- Name: document_category_pivot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."document_category_pivot_id_seq"', 1, false);


--
-- Name: document_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."document_id_seq"', 1, false);


--
-- Name: image_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."image_category_id_seq"', 1, false);


--
-- Name: image_category_pivot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."image_category_pivot_id_seq"', 1, false);


--
-- Name: image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."image_id_seq"', 1, false);


--
-- Name: institute_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."institute_id_seq"', 1, false);


--
-- Name: menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."menu_id_seq"', 1, true);


--
-- Name: page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."page_id_seq"', 1, true);


--
-- Name: question_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."question_category_id_seq"', 1, false);


--
-- Name: question_category_pivot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."question_category_pivot_id_seq"', 1, false);


--
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."question_id_seq"', 1, false);


--
-- Name: question_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."question_type_id_seq"', 1, false);


--
-- Name: reaction_entity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."reaction_entity_id_seq"', 1, false);


--
-- Name: reaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."reaction_id_seq"', 1, false);


--
-- Name: reaction_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."reaction_type_id_seq"', 1, false);


--
-- Name: section_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."section_id_seq"', 29, true);


--
-- Name: theme_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."theme_id_seq"', 4, true);


--
-- Name: theme_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."theme_page_id_seq"', 6, true);


--
-- Name: theme_page_section_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."theme_page_section_id_seq"', 8, true);


--
-- Name: video_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."video_category_id_seq"', 1, false);


--
-- Name: video_category_pivot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."video_category_pivot_id_seq"', 1, false);


--
-- Name: video_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."video_id_seq"', 1, true);


--
-- Name: website_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."website_id_seq"', 3, true);


--
-- Name: article_category_pivot article_category_pivot_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."article_category_pivot"
    ADD CONSTRAINT "article_category_pivot_pkey" PRIMARY KEY ("id");


--
-- Name: article_category article_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."article_category"
    ADD CONSTRAINT "article_category_pkey" PRIMARY KEY ("id");


--
-- Name: article article_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."article"
    ADD CONSTRAINT "article_pkey" PRIMARY KEY ("id");


--
-- Name: audio_category_pivot audio_category_pivot_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."audio_category_pivot"
    ADD CONSTRAINT "audio_category_pivot_pk" UNIQUE ("audio_category_id", "audio_id");


--
-- Name: audio_category_pivot audio_category_pivot_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."audio_category_pivot"
    ADD CONSTRAINT "audio_category_pivot_pkey" PRIMARY KEY ("id");


--
-- Name: audio_category audio_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."audio_category"
    ADD CONSTRAINT "audio_category_pkey" PRIMARY KEY ("id");


--
-- Name: audio audio_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."audio"
    ADD CONSTRAINT "audio_pkey" PRIMARY KEY ("id");


--
-- Name: book_author book_author_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book_author"
    ADD CONSTRAINT "book_author_pkey" PRIMARY KEY ("id");


--
-- Name: book_category_pivot book_category_pivot_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book_category_pivot"
    ADD CONSTRAINT "book_category_pivot_pkey" PRIMARY KEY ("id");


--
-- Name: book_category book_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book_category"
    ADD CONSTRAINT "book_category_pkey" PRIMARY KEY ("id");


--
-- Name: book book_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book"
    ADD CONSTRAINT "book_pkey" PRIMARY KEY ("id");


--
-- Name: comment_entity comment_entity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."comment_entity"
    ADD CONSTRAINT "comment_entity_pkey" PRIMARY KEY ("id");


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."comment"
    ADD CONSTRAINT "comment_pkey" PRIMARY KEY ("id");


--
-- Name: directus_activity directus_activity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_activity"
    ADD CONSTRAINT "directus_activity_pkey" PRIMARY KEY ("id");


--
-- Name: directus_collections directus_collections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_collections"
    ADD CONSTRAINT "directus_collections_pkey" PRIMARY KEY ("collection");


--
-- Name: directus_dashboards directus_dashboards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_dashboards"
    ADD CONSTRAINT "directus_dashboards_pkey" PRIMARY KEY ("id");


--
-- Name: directus_fields directus_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_fields"
    ADD CONSTRAINT "directus_fields_pkey" PRIMARY KEY ("id");


--
-- Name: directus_files directus_files_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_files"
    ADD CONSTRAINT "directus_files_pkey" PRIMARY KEY ("id");


--
-- Name: directus_folders directus_folders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_folders"
    ADD CONSTRAINT "directus_folders_pkey" PRIMARY KEY ("id");


--
-- Name: directus_migrations directus_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_migrations"
    ADD CONSTRAINT "directus_migrations_pkey" PRIMARY KEY ("version");


--
-- Name: directus_panels directus_panels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_panels"
    ADD CONSTRAINT "directus_panels_pkey" PRIMARY KEY ("id");


--
-- Name: directus_permissions directus_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_permissions"
    ADD CONSTRAINT "directus_permissions_pkey" PRIMARY KEY ("id");


--
-- Name: directus_presets directus_presets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_presets"
    ADD CONSTRAINT "directus_presets_pkey" PRIMARY KEY ("id");


--
-- Name: directus_relations directus_relations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_relations"
    ADD CONSTRAINT "directus_relations_pkey" PRIMARY KEY ("id");


--
-- Name: directus_revisions directus_revisions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_revisions"
    ADD CONSTRAINT "directus_revisions_pkey" PRIMARY KEY ("id");


--
-- Name: directus_roles directus_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_roles"
    ADD CONSTRAINT "directus_roles_pkey" PRIMARY KEY ("id");


--
-- Name: directus_sessions directus_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_sessions"
    ADD CONSTRAINT "directus_sessions_pkey" PRIMARY KEY ("token");


--
-- Name: directus_settings directus_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_settings"
    ADD CONSTRAINT "directus_settings_pkey" PRIMARY KEY ("id");


--
-- Name: directus_users directus_users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_users"
    ADD CONSTRAINT "directus_users_email_unique" UNIQUE ("email");


--
-- Name: directus_users directus_users_external_identifier_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_users"
    ADD CONSTRAINT "directus_users_external_identifier_unique" UNIQUE ("external_identifier");


--
-- Name: directus_users directus_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_users"
    ADD CONSTRAINT "directus_users_pkey" PRIMARY KEY ("id");


--
-- Name: directus_users directus_users_token_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_users"
    ADD CONSTRAINT "directus_users_token_unique" UNIQUE ("token");


--
-- Name: directus_webhooks directus_webhooks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_webhooks"
    ADD CONSTRAINT "directus_webhooks_pkey" PRIMARY KEY ("id");


--
-- Name: document_category_pivot document_category_pivot_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."document_category_pivot"
    ADD CONSTRAINT "document_category_pivot_pkey" PRIMARY KEY ("id");


--
-- Name: document_category document_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."document_category"
    ADD CONSTRAINT "document_category_pkey" PRIMARY KEY ("id");


--
-- Name: document document_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."document"
    ADD CONSTRAINT "document_pkey" PRIMARY KEY ("id");


--
-- Name: image_category_pivot image_category_pivot_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."image_category_pivot"
    ADD CONSTRAINT "image_category_pivot_pkey" PRIMARY KEY ("id");


--
-- Name: image_category image_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."image_category"
    ADD CONSTRAINT "image_category_pkey" PRIMARY KEY ("id");


--
-- Name: image image_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."image"
    ADD CONSTRAINT "image_pkey" PRIMARY KEY ("id");


--
-- Name: institute institute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."institute"
    ADD CONSTRAINT "institute_pkey" PRIMARY KEY ("id");


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."menu"
    ADD CONSTRAINT "menu_pkey" PRIMARY KEY ("id");


--
-- Name: page page_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."page"
    ADD CONSTRAINT "page_pkey" PRIMARY KEY ("id");


--
-- Name: question_category_pivot question_category_pivot_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question_category_pivot"
    ADD CONSTRAINT "question_category_pivot_pkey" PRIMARY KEY ("id");


--
-- Name: question_category question_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question_category"
    ADD CONSTRAINT "question_category_pkey" PRIMARY KEY ("id");


--
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question"
    ADD CONSTRAINT "question_pkey" PRIMARY KEY ("id");


--
-- Name: question_type question_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question_type"
    ADD CONSTRAINT "question_type_pkey" PRIMARY KEY ("id");


--
-- Name: reaction_entity reaction_entity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reaction_entity"
    ADD CONSTRAINT "reaction_entity_pkey" PRIMARY KEY ("id");


--
-- Name: reaction reaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reaction"
    ADD CONSTRAINT "reaction_pkey" PRIMARY KEY ("id");


--
-- Name: reaction_type reaction_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reaction_type"
    ADD CONSTRAINT "reaction_type_pkey" PRIMARY KEY ("id");


--
-- Name: section section_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."section"
    ADD CONSTRAINT "section_pkey" PRIMARY KEY ("id");


--
-- Name: theme_page theme_page_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."theme_page"
    ADD CONSTRAINT "theme_page_pkey" PRIMARY KEY ("id");


--
-- Name: theme_page_section theme_page_section_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."theme_page_section"
    ADD CONSTRAINT "theme_page_section_pkey" PRIMARY KEY ("id");


--
-- Name: theme theme_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."theme"
    ADD CONSTRAINT "theme_pkey" PRIMARY KEY ("id");


--
-- Name: video_category_pivot video_category_pivot_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."video_category_pivot"
    ADD CONSTRAINT "video_category_pivot_pkey" PRIMARY KEY ("id");


--
-- Name: video_category video_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."video_category"
    ADD CONSTRAINT "video_category_pkey" PRIMARY KEY ("id");


--
-- Name: video video_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."video"
    ADD CONSTRAINT "video_pkey" PRIMARY KEY ("id");


--
-- Name: website website_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."website"
    ADD CONSTRAINT "website_pkey" PRIMARY KEY ("id");


--
-- Name: article_category_name_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "article_category_name_index" ON "public"."article_category" USING "btree" ("name");


--
-- Name: article_category_pivot_article_id_article_category_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "article_category_pivot_article_id_article_category_id_uindex" ON "public"."article_category_pivot" USING "btree" ("article_id", "article_category_id");


--
-- Name: article_content_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "article_content_index" ON "public"."article" USING "btree" ("content");


--
-- Name: article_tags_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "article_tags_index" ON "public"."article" USING "btree" ("tags");


--
-- Name: audio_category_name_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "audio_category_name_index" ON "public"."audio_category" USING "btree" ("name");


--
-- Name: audio_title_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "audio_title_index" ON "public"."audio" USING "btree" ("title");


--
-- Name: book_author_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "book_author_index" ON "public"."book" USING "btree" ("author");


--
-- Name: book_author_name_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "book_author_name_index" ON "public"."book_author" USING "btree" ("name");


--
-- Name: book_category_name_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "book_category_name_index" ON "public"."book_category" USING "btree" ("name");


--
-- Name: book_category_pivot_book_category_id_book_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "book_category_pivot_book_category_id_book_id_uindex" ON "public"."book_category_pivot" USING "btree" ("book_category_id", "book_id");


--
-- Name: book_name_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "book_name_index" ON "public"."book" USING "btree" ("name");


--
-- Name: book_tags_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "book_tags_index" ON "public"."book" USING "btree" ("tags");


--
-- Name: comment_entity_collection_comment_id_item_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "comment_entity_collection_comment_id_item_uindex" ON "public"."comment_entity" USING "btree" ("collection", "comment_id", "item");


--
-- Name: comment_parent_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "comment_parent_index" ON "public"."comment" USING "btree" ("parent");


--
-- Name: document_category_name_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "document_category_name_index" ON "public"."document_category" USING "btree" ("name");


--
-- Name: document_category_pivot_document_category_id_document_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "document_category_pivot_document_category_id_document_id_uindex" ON "public"."document_category_pivot" USING "btree" ("document_category_id", "document_id");


--
-- Name: document_tags_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "document_tags_index" ON "public"."document" USING "btree" ("tags");


--
-- Name: document_title_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "document_title_index" ON "public"."document" USING "btree" ("title");


--
-- Name: image_category_name_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "image_category_name_index" ON "public"."image_category" USING "btree" ("name");


--
-- Name: image_category_pivot_image_category_id_image_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "image_category_pivot_image_category_id_image_id_index" ON "public"."image_category_pivot" USING "btree" ("image_category_id", "image_id");


--
-- Name: image_tags_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "image_tags_index" ON "public"."image" USING "btree" ("tags");


--
-- Name: image_title_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "image_title_index" ON "public"."image" USING "btree" ("title");


--
-- Name: page_title_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "page_title_index" ON "public"."page" USING "btree" ("title");


--
-- Name: question_category_name_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "question_category_name_index" ON "public"."question_category" USING "btree" ("name");


--
-- Name: question_category_pivot_question_category_id_question_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "question_category_pivot_question_category_id_question_id_uindex" ON "public"."question_category_pivot" USING "btree" ("question_category_id", "question_id");


--
-- Name: question_question_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "question_question_index" ON "public"."question" USING "btree" ("question");


--
-- Name: question_question_type_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "question_question_type_index" ON "public"."question" USING "btree" ("question_type");


--
-- Name: question_type_name_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "question_type_name_index" ON "public"."question_type" USING "btree" ("name");


--
-- Name: reaction_entity_item_collection_reaction_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "reaction_entity_item_collection_reaction_id_index" ON "public"."reaction_entity" USING "btree" ("item", "collection", "reaction_id");


--
-- Name: reaction_type_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "reaction_type_index" ON "public"."reaction" USING "btree" ("type");


--
-- Name: reaction_type_name_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "reaction_type_name_index" ON "public"."reaction_type" USING "btree" ("name");


--
-- Name: theme_page_section_page_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "theme_page_section_page_index" ON "public"."theme_page_section" USING "btree" ("page");


--
-- Name: theme_page_theme_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "theme_page_theme_index" ON "public"."theme_page" USING "btree" ("theme");


--
-- Name: video_category_name_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "video_category_name_index" ON "public"."video_category" USING "btree" ("name");


--
-- Name: video_category_pivot_video_category_id_video_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "video_category_pivot_video_category_id_video_id_uindex" ON "public"."video_category_pivot" USING "btree" ("video_category_id", "video_id");


--
-- Name: video_tags_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "video_tags_index" ON "public"."video" USING "btree" ("tags");


--
-- Name: video_title_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "video_title_index" ON "public"."video" USING "btree" ("title");


--
-- Name: article_category_pivot article_category_pivot_article_category_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."article_category_pivot"
    ADD CONSTRAINT "article_category_pivot_article_category_id_fk" FOREIGN KEY ("article_category_id") REFERENCES "public"."article_category"("id") ON DELETE CASCADE;


--
-- Name: article_category_pivot article_category_pivot_article_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."article_category_pivot"
    ADD CONSTRAINT "article_category_pivot_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE CASCADE;


--
-- Name: article_category article_category_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."article_category"
    ADD CONSTRAINT "article_category_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: article_category article_category_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."article_category"
    ADD CONSTRAINT "article_category_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: article article_featured_image_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."article"
    ADD CONSTRAINT "article_featured_image_foreign" FOREIGN KEY ("featured_image") REFERENCES "public"."directus_files"("id");


--
-- Name: article article_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."article"
    ADD CONSTRAINT "article_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: article article_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."article"
    ADD CONSTRAINT "article_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: audio audio_audio_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."audio"
    ADD CONSTRAINT "audio_audio_foreign" FOREIGN KEY ("audio") REFERENCES "public"."directus_files"("id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: audio_category_pivot audio_category_pivot_audio_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."audio_category_pivot"
    ADD CONSTRAINT "audio_category_pivot_audio_category_id_foreign" FOREIGN KEY ("audio_category_id") REFERENCES "public"."audio_category"("id") ON DELETE CASCADE;


--
-- Name: audio_category_pivot audio_category_pivot_audio_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."audio_category_pivot"
    ADD CONSTRAINT "audio_category_pivot_audio_id_foreign" FOREIGN KEY ("audio_id") REFERENCES "public"."audio"("id") ON DELETE CASCADE;


--
-- Name: audio_category audio_category_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."audio_category"
    ADD CONSTRAINT "audio_category_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: audio_category audio_category_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."audio_category"
    ADD CONSTRAINT "audio_category_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: audio audio_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."audio"
    ADD CONSTRAINT "audio_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: audio audio_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."audio"
    ADD CONSTRAINT "audio_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: book book_author_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book"
    ADD CONSTRAINT "book_author_foreign" FOREIGN KEY ("author") REFERENCES "public"."book_author"("id") ON DELETE SET NULL;


--
-- Name: book_author book_author_photo_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book_author"
    ADD CONSTRAINT "book_author_photo_foreign" FOREIGN KEY ("photo") REFERENCES "public"."directus_files"("id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: book_author book_author_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book_author"
    ADD CONSTRAINT "book_author_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: book_author book_author_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book_author"
    ADD CONSTRAINT "book_author_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: book book_book_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book"
    ADD CONSTRAINT "book_book_foreign" FOREIGN KEY ("book") REFERENCES "public"."directus_files"("id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: book_category_pivot book_category_pivot_book_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book_category_pivot"
    ADD CONSTRAINT "book_category_pivot_book_category_id_foreign" FOREIGN KEY ("book_category_id") REFERENCES "public"."book_category"("id") ON DELETE CASCADE;


--
-- Name: book_category_pivot book_category_pivot_book_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book_category_pivot"
    ADD CONSTRAINT "book_category_pivot_book_id_foreign" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE CASCADE;


--
-- Name: book_category book_category_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book_category"
    ADD CONSTRAINT "book_category_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: book_category book_category_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book_category"
    ADD CONSTRAINT "book_category_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: book book_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book"
    ADD CONSTRAINT "book_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: book book_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."book"
    ADD CONSTRAINT "book_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: comment_entity comment_entity_comment_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."comment_entity"
    ADD CONSTRAINT "comment_entity_comment_id_foreign" FOREIGN KEY ("comment_id") REFERENCES "public"."comment"("id") ON DELETE CASCADE;


--
-- Name: comment comment_parent_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."comment"
    ADD CONSTRAINT "comment_parent_foreign" FOREIGN KEY ("parent") REFERENCES "public"."comment"("id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comment comment_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."comment"
    ADD CONSTRAINT "comment_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: directus_collections directus_collections_group_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_collections"
    ADD CONSTRAINT "directus_collections_group_foreign" FOREIGN KEY ("group") REFERENCES "public"."directus_collections"("collection");


--
-- Name: directus_dashboards directus_dashboards_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_dashboards"
    ADD CONSTRAINT "directus_dashboards_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id") ON DELETE SET NULL;


--
-- Name: directus_files directus_files_folder_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_files"
    ADD CONSTRAINT "directus_files_folder_foreign" FOREIGN KEY ("folder") REFERENCES "public"."directus_folders"("id") ON DELETE SET NULL;


--
-- Name: directus_files directus_files_modified_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_files"
    ADD CONSTRAINT "directus_files_modified_by_foreign" FOREIGN KEY ("modified_by") REFERENCES "public"."directus_users"("id");


--
-- Name: directus_files directus_files_uploaded_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_files"
    ADD CONSTRAINT "directus_files_uploaded_by_foreign" FOREIGN KEY ("uploaded_by") REFERENCES "public"."directus_users"("id");


--
-- Name: directus_folders directus_folders_parent_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_folders"
    ADD CONSTRAINT "directus_folders_parent_foreign" FOREIGN KEY ("parent") REFERENCES "public"."directus_folders"("id");


--
-- Name: directus_panels directus_panels_dashboard_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_panels"
    ADD CONSTRAINT "directus_panels_dashboard_foreign" FOREIGN KEY ("dashboard") REFERENCES "public"."directus_dashboards"("id") ON DELETE CASCADE;


--
-- Name: directus_panels directus_panels_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_panels"
    ADD CONSTRAINT "directus_panels_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id") ON DELETE SET NULL;


--
-- Name: directus_permissions directus_permissions_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_permissions"
    ADD CONSTRAINT "directus_permissions_role_foreign" FOREIGN KEY ("role") REFERENCES "public"."directus_roles"("id") ON DELETE CASCADE;


--
-- Name: directus_presets directus_presets_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_presets"
    ADD CONSTRAINT "directus_presets_role_foreign" FOREIGN KEY ("role") REFERENCES "public"."directus_roles"("id") ON DELETE CASCADE;


--
-- Name: directus_presets directus_presets_user_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_presets"
    ADD CONSTRAINT "directus_presets_user_foreign" FOREIGN KEY ("user") REFERENCES "public"."directus_users"("id") ON DELETE CASCADE;


--
-- Name: directus_revisions directus_revisions_activity_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_revisions"
    ADD CONSTRAINT "directus_revisions_activity_foreign" FOREIGN KEY ("activity") REFERENCES "public"."directus_activity"("id") ON DELETE CASCADE;


--
-- Name: directus_revisions directus_revisions_parent_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_revisions"
    ADD CONSTRAINT "directus_revisions_parent_foreign" FOREIGN KEY ("parent") REFERENCES "public"."directus_revisions"("id");


--
-- Name: directus_sessions directus_sessions_user_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_sessions"
    ADD CONSTRAINT "directus_sessions_user_foreign" FOREIGN KEY ("user") REFERENCES "public"."directus_users"("id") ON DELETE CASCADE;


--
-- Name: directus_settings directus_settings_project_logo_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_settings"
    ADD CONSTRAINT "directus_settings_project_logo_foreign" FOREIGN KEY ("project_logo") REFERENCES "public"."directus_files"("id");


--
-- Name: directus_settings directus_settings_public_background_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_settings"
    ADD CONSTRAINT "directus_settings_public_background_foreign" FOREIGN KEY ("public_background") REFERENCES "public"."directus_files"("id");


--
-- Name: directus_settings directus_settings_public_foreground_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_settings"
    ADD CONSTRAINT "directus_settings_public_foreground_foreign" FOREIGN KEY ("public_foreground") REFERENCES "public"."directus_files"("id");


--
-- Name: directus_settings directus_settings_storage_default_folder_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_settings"
    ADD CONSTRAINT "directus_settings_storage_default_folder_foreign" FOREIGN KEY ("storage_default_folder") REFERENCES "public"."directus_folders"("id") ON DELETE SET NULL;


--
-- Name: directus_users directus_users_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_users"
    ADD CONSTRAINT "directus_users_role_foreign" FOREIGN KEY ("role") REFERENCES "public"."directus_roles"("id") ON DELETE SET NULL;


--
-- Name: document_category_pivot document_category_pivot_document_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."document_category_pivot"
    ADD CONSTRAINT "document_category_pivot_document_category_id_foreign" FOREIGN KEY ("document_category_id") REFERENCES "public"."document_category"("id") ON DELETE CASCADE;


--
-- Name: document_category_pivot document_category_pivot_document_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."document_category_pivot"
    ADD CONSTRAINT "document_category_pivot_document_id_foreign" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE CASCADE;


--
-- Name: document_category document_category_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."document_category"
    ADD CONSTRAINT "document_category_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: document_category document_category_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."document_category"
    ADD CONSTRAINT "document_category_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: document document_document_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."document"
    ADD CONSTRAINT "document_document_foreign" FOREIGN KEY ("document") REFERENCES "public"."directus_files"("id") ON DELETE RESTRICT;


--
-- Name: document document_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."document"
    ADD CONSTRAINT "document_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: document document_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."document"
    ADD CONSTRAINT "document_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: image_category_pivot image_category_pivot_image_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."image_category_pivot"
    ADD CONSTRAINT "image_category_pivot_image_category_id_foreign" FOREIGN KEY ("image_category_id") REFERENCES "public"."image_category"("id") ON DELETE CASCADE;


--
-- Name: image_category_pivot image_category_pivot_image_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."image_category_pivot"
    ADD CONSTRAINT "image_category_pivot_image_id_foreign" FOREIGN KEY ("image_id") REFERENCES "public"."image"("id") ON DELETE CASCADE;


--
-- Name: image_category image_category_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."image_category"
    ADD CONSTRAINT "image_category_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: image_category image_category_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."image_category"
    ADD CONSTRAINT "image_category_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: image image_image_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."image"
    ADD CONSTRAINT "image_image_foreign" FOREIGN KEY ("image") REFERENCES "public"."directus_files"("id") ON DELETE SET NULL;


--
-- Name: image image_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."image"
    ADD CONSTRAINT "image_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: image image_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."image"
    ADD CONSTRAINT "image_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: institute institute_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."institute"
    ADD CONSTRAINT "institute_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: menu menu_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."menu"
    ADD CONSTRAINT "menu_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id") ON DELETE SET NULL;


--
-- Name: menu menu_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."menu"
    ADD CONSTRAINT "menu_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id") ON DELETE SET NULL;


--
-- Name: page page_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."page"
    ADD CONSTRAINT "page_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: page page_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."page"
    ADD CONSTRAINT "page_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: question_category_pivot question_category_pivot_question_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question_category_pivot"
    ADD CONSTRAINT "question_category_pivot_question_category_id_foreign" FOREIGN KEY ("question_category_id") REFERENCES "public"."question_category"("id") ON DELETE CASCADE;


--
-- Name: question_category_pivot question_category_pivot_question_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question_category_pivot"
    ADD CONSTRAINT "question_category_pivot_question_id_foreign" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE CASCADE;


--
-- Name: question_category question_category_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question_category"
    ADD CONSTRAINT "question_category_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: question_category question_category_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question_category"
    ADD CONSTRAINT "question_category_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: question question_question_type_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question"
    ADD CONSTRAINT "question_question_type_foreign" FOREIGN KEY ("question_type") REFERENCES "public"."question_type"("id") ON DELETE CASCADE;


--
-- Name: question_type question_type_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question_type"
    ADD CONSTRAINT "question_type_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: question_type question_type_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question_type"
    ADD CONSTRAINT "question_type_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: question question_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."question"
    ADD CONSTRAINT "question_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: reaction_entity reaction_entity_reaction_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reaction_entity"
    ADD CONSTRAINT "reaction_entity_reaction_id_foreign" FOREIGN KEY ("reaction_id") REFERENCES "public"."reaction"("id") ON DELETE CASCADE;


--
-- Name: reaction reaction_type_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reaction"
    ADD CONSTRAINT "reaction_type_foreign" FOREIGN KEY ("type") REFERENCES "public"."reaction_type"("id") ON DELETE CASCADE;


--
-- Name: reaction_type reaction_type_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reaction_type"
    ADD CONSTRAINT "reaction_type_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: reaction_type reaction_type_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reaction_type"
    ADD CONSTRAINT "reaction_type_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: reaction reaction_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."reaction"
    ADD CONSTRAINT "reaction_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: section section_page_section_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."section"
    ADD CONSTRAINT "section_page_section_foreign" FOREIGN KEY ("page_section") REFERENCES "public"."theme_page_section"("id") ON DELETE CASCADE;


--
-- Name: section section_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."section"
    ADD CONSTRAINT "section_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id") ON DELETE SET NULL;


--
-- Name: theme_page_section theme_page_section_page_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."theme_page_section"
    ADD CONSTRAINT "theme_page_section_page_foreign" FOREIGN KEY ("page") REFERENCES "public"."theme_page"("id") ON DELETE CASCADE;


--
-- Name: theme_page theme_page_theme_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."theme_page"
    ADD CONSTRAINT "theme_page_theme_foreign" FOREIGN KEY ("theme") REFERENCES "public"."theme"("id") ON DELETE CASCADE;


--
-- Name: video_category_pivot video_category_pivot_video_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."video_category_pivot"
    ADD CONSTRAINT "video_category_pivot_video_category_id_foreign" FOREIGN KEY ("video_category_id") REFERENCES "public"."video_category"("id") ON DELETE CASCADE;


--
-- Name: video_category_pivot video_category_pivot_video_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."video_category_pivot"
    ADD CONSTRAINT "video_category_pivot_video_id_foreign" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE CASCADE;


--
-- Name: video_category video_category_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."video_category"
    ADD CONSTRAINT "video_category_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: video_category video_category_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."video_category"
    ADD CONSTRAINT "video_category_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: video video_subtitle_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."video"
    ADD CONSTRAINT "video_subtitle_foreign" FOREIGN KEY ("subtitle") REFERENCES "public"."directus_files"("id") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: video video_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."video"
    ADD CONSTRAINT "video_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id");


--
-- Name: video video_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."video"
    ADD CONSTRAINT "video_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- Name: video video_video_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."video"
    ADD CONSTRAINT "video_video_foreign" FOREIGN KEY ("video") REFERENCES "public"."directus_files"("id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: website website_logo_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."website"
    ADD CONSTRAINT "website_logo_foreign" FOREIGN KEY ("logo") REFERENCES "public"."directus_files"("id") ON DELETE SET NULL;


--
-- Name: website website_theme_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."website"
    ADD CONSTRAINT "website_theme_foreign" FOREIGN KEY ("theme") REFERENCES "public"."theme"("id") ON DELETE SET NULL;


--
-- Name: website website_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."website"
    ADD CONSTRAINT "website_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id");


--
-- PostgreSQL database dump complete
--


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

SET default_tablespace = '';

SET default_table_access_method = "heap";

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
    "metadata" "json",
    "read_only" boolean DEFAULT true NOT NULL
);


--
-- Name: directus_folders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_folders" (
    "id" "uuid" NOT NULL,
    "name" character varying(255) NOT NULL,
    "parent" "uuid",
    "read_only" boolean DEFAULT true NOT NULL
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
-- Name: directus_notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."directus_notifications" (
    "id" integer NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    "status" character varying(255) DEFAULT 'inbox'::character varying,
    "recipient" "uuid" NOT NULL,
    "sender" "uuid" NOT NULL,
    "subject" character varying(255) NOT NULL,
    "message" "text",
    "collection" character varying(64),
    "item" character varying(255)
);


--
-- Name: directus_notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."directus_notifications_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: directus_notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."directus_notifications_id_seq" OWNED BY "public"."directus_notifications"."id";


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
    "auth_data" "json",
    "email_notifications" boolean DEFAULT true
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
-- Name: institute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."institute" (
    "id" integer NOT NULL,
    "status" character varying(255) DEFAULT 'draft'::character varying NOT NULL,
    "user_created" "uuid",
    "date_created" timestamp with time zone,
    "user_updated" "uuid",
    "date_updated" timestamp with time zone,
    "name" character varying(255) NOT NULL,
    "phone" character varying(255),
    "email" character varying(255),
    "code" character varying(255) NOT NULL,
    "db_name" character varying(255),
    "domain" character varying(255) NOT NULL
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
-- Name: theme; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."theme" (
    "id" character varying(255) NOT NULL,
    "name" character varying(255) NOT NULL,
    "cover" "uuid",
    "version" character varying(255) DEFAULT '1.0.0'::character varying
);


--
-- Name: theme_page; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."theme_page" (
    "id" character varying(255) NOT NULL,
    "sort" integer,
    "name" character varying(255) NOT NULL,
    "icon" character varying(255),
    "theme" character varying(255) NOT NULL
);


--
-- Name: theme_page_section; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."theme_page_section" (
    "id" character varying(255) NOT NULL,
    "sort" integer,
    "name" character varying(255) NOT NULL,
    "icon" character varying(255),
    "sortable" boolean DEFAULT true NOT NULL,
    "can_hide" boolean DEFAULT true NOT NULL,
    "fields" "json" NOT NULL,
    "page" character varying(255) NOT NULL
);


--
-- Name: directus_activity id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_activity" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."directus_activity_id_seq"'::"regclass");


--
-- Name: directus_fields id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_fields" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."directus_fields_id_seq"'::"regclass");


--
-- Name: directus_notifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_notifications" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."directus_notifications_id_seq"'::"regclass");


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
-- Name: institute id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."institute" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."institute_id_seq"'::"regclass");


--
-- Data for Name: directus_activity; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: directus_collections; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_collections" VALUES ('institute', 'business', NULL, NULL, false, false, NULL, 'status', true, 'archived', 'draft', NULL, 'all', NULL, NULL, NULL, NULL, 'open');
INSERT INTO "public"."directus_collections" VALUES ('theme', 'color_lens', NULL, NULL, false, false, NULL, NULL, true, NULL, NULL, NULL, 'all', NULL, NULL, NULL, NULL, 'open');
INSERT INTO "public"."directus_collections" VALUES ('theme_page_section', 'format_list_bulleted', NULL, NULL, false, false, '[{"language":"en-US","translation":"Section","singular":"Section","plural":"Sections"}]', NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, NULL, NULL, 'open');
INSERT INTO "public"."directus_collections" VALUES ('theme_page', 'article', NULL, NULL, false, false, '[{"language":"en-US","translation":"Page","singular":"Page","plural":"Pages"}]', NULL, true, NULL, NULL, 'sort', 'all', NULL, NULL, NULL, NULL, 'open');


--
-- Data for Name: directus_dashboards; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: directus_fields; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_fields" VALUES (28, 'theme_page', 'id', NULL, 'input', NULL, NULL, NULL, false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (29, 'theme_page', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (34, 'theme_page', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title","trim":true}', NULL, NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (35, 'theme_page', 'icon', NULL, 'select-icon', NULL, 'icon', NULL, false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (4, 'institute', 'date_created', 'date-created', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 4, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (36, 'theme_page', 'theme', 'm2o', 'select-dropdown-m2o', '{"template":"{{name}}"}', 'related-values', '{"template":"{{name}}"}', false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (5, 'institute', 'user_updated', 'user-updated', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 5, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (9, 'institute', 'email', NULL, 'input', '{"placeholder":"Email Address","iconLeft":"alternate_email","trim":true}', NULL, NULL, false, false, 10, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (8, 'institute', 'phone', NULL, 'input', '{"placeholder":"Phone Number","iconLeft":"local_phone","trim":true}', NULL, NULL, false, false, 11, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (13, 'institute', 'db_name', NULL, 'input', '{"iconLeft":"storage","placeholder":"DB Name","trim":true}', NULL, NULL, false, true, 13, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (60, 'directus_settings', 'Multitenancy', 'alias,no-data', 'presentation-divider', '{"title":"Multitenancy","icon":"settings_input_composite"}', NULL, NULL, false, false, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (6, 'institute', 'date_updated', 'date-updated', 'datetime', NULL, 'datetime', '{"relative":true}', true, true, 6, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (7, 'institute', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title","trim":true}', NULL, NULL, false, false, 7, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (1, 'institute', 'id', NULL, 'input', NULL, NULL, NULL, true, true, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (58, 'theme_page', 'theme_page_section', 'o2m', 'list-o2m', NULL, NULL, NULL, false, false, NULL, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (2, 'institute', 'status', NULL, 'select-dropdown', '{"choices":[{"text":"$t:published","value":"published"},{"text":"$t:draft","value":"draft"},{"text":"$t:archived","value":"archived"}]}', 'labels', '{"showAsDot":true,"choices":[{"background":"#00C897","value":"published"},{"background":"#D3DAE4","value":"draft"},{"background":"#F7971C","value":"archived"}]}', false, false, 2, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (16, 'institute', 'domain', NULL, 'input', '{"placeholder":"Domain","iconLeft":"language","trim":true}', NULL, NULL, false, false, 9, 'half', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (3, 'institute', 'user_created', 'user-created', 'select-dropdown-m2o', '{"template":"{{avatar.$thumbnail}} {{first_name}} {{last_name}}"}', 'user', NULL, true, true, 3, 'half', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (11, 'institute', 'code', NULL, 'input', '{"placeholder":"Code","iconLeft":"label","trim":true}', NULL, NULL, false, false, 8, 'half', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (71, 'directus_files', 'read_only', 'boolean', 'boolean', '{"label":"Readonly"}', 'boolean', NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (72, 'directus_folders', 'read_only', 'boolean', 'boolean', '{"label":"Readonly"}', 'boolean', NULL, false, false, NULL, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (56, 'theme_page_section', 'fields', 'json', 'form-builder', NULL, 'formatted-json-value', NULL, false, false, 8, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (46, 'theme_page_section', 'id', NULL, 'input', NULL, NULL, NULL, false, false, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (47, 'theme_page_section', 'sort', NULL, 'input', NULL, NULL, NULL, false, true, 2, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (52, 'theme_page_section', 'name', NULL, 'input', '{"placeholder":"Name","iconLeft":"title","trim":true}', NULL, NULL, false, false, 3, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (53, 'theme_page_section', 'icon', NULL, 'select-icon', NULL, 'icon', NULL, false, false, 4, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (54, 'theme_page_section', 'sortable', 'boolean', 'boolean', NULL, 'boolean', NULL, false, false, 5, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (55, 'theme_page_section', 'can_hide', 'boolean', 'boolean', NULL, 'boolean', NULL, false, false, 6, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (57, 'theme_page_section', 'page', 'm2o', 'select-dropdown-m2o', '{"template":"{{name}} - {{theme.name}}"}', 'related-values', '{"template":"{{name}} - {{theme.name}}"}', false, false, 7, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (17, 'theme', 'id', NULL, 'input', NULL, NULL, NULL, false, false, 1, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (22, 'theme', 'name', NULL, 'input', '{"iconLeft":"title","trim":true}', NULL, NULL, false, false, 2, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (78, 'theme', 'version', NULL, 'input', '{"iconLeft":"label_important","trim":true}', NULL, NULL, false, false, 3, 'full', NULL, NULL, NULL, true, NULL);
INSERT INTO "public"."directus_fields" VALUES (73, 'theme', 'cover', 'file', 'file-image', NULL, 'image', NULL, false, false, 4, 'full', NULL, NULL, NULL, false, NULL);
INSERT INTO "public"."directus_fields" VALUES (37, 'theme', 'theme_page', 'o2m', 'list-o2m', NULL, NULL, NULL, false, false, 5, 'full', '[{"language":"en-US","translation":"Pages"}]', NULL, NULL, false, NULL);


--
-- Data for Name: directus_files; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_files" VALUES ('42c95a11-408f-415d-8c3e-fc8e073ac5a0', 'local', '42c95a11-408f-415d-8c3e-fc8e073ac5a0.png', 'pricing-free.png', 'Pricing Free', 'image/png', '520a5812-5bca-4e68-8532-5ce450750d46', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-03 14:04:32.713477+00', NULL, '2021-12-03 14:04:32.76+00', NULL, 6518, 278, 191, NULL, NULL, NULL, NULL, NULL, '{"ihdr":{"ImageWidth":278,"ImageHeight":191,"BitDepth":8,"ColorType":"Palette","Compression":"Deflate/Inflate","Filter":"Adaptive","Interlace":"Noninterlaced"}}', true);
INSERT INTO "public"."directus_files" VALUES ('a7a19d7f-184f-4c17-b9b6-c2f6b9d8a880', 'local', 'a7a19d7f-184f-4c17-b9b6-c2f6b9d8a880.png', 'pricing-starter.png', 'Pricing Starter', 'image/png', '520a5812-5bca-4e68-8532-5ce450750d46', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-03 14:04:32.715137+00', NULL, '2021-12-03 14:04:32.77+00', NULL, 8215, 278, 191, NULL, NULL, NULL, NULL, NULL, '{"ihdr":{"ImageWidth":278,"ImageHeight":191,"BitDepth":8,"ColorType":"Palette","Compression":"Deflate/Inflate","Filter":"Adaptive","Interlace":"Noninterlaced"}}', true);
INSERT INTO "public"."directus_files" VALUES ('22cb1536-b477-4629-9467-71822bfc4dcd', 'local', '22cb1536-b477-4629-9467-71822bfc4dcd.svg', 'Man_riding_camel_in_desert_night.svg', 'Man Riding Camel in Desert Night', 'image/svg+xml', '520a5812-5bca-4e68-8532-5ce450750d46', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-11-29 10:54:11.046967+00', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-11-29 10:56:34.495+00', NULL, 975291, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, true);
INSERT INTO "public"."directus_files" VALUES ('dc1ff2b2-33ec-48ac-8ab3-7927467ad0d2', 'local', 'dc1ff2b2-33ec-48ac-8ab3-7927467ad0d2.svg', 'minar.svg', 'Minar', 'image/svg+xml', '520a5812-5bca-4e68-8532-5ce450750d46', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-03 13:28:02.976638+00', NULL, '2021-12-03 13:28:03.09+00', NULL, 262348, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, true);
INSERT INTO "public"."directus_files" VALUES ('bd041fd6-fdf0-4b1b-8f50-f02b88c05352', 'local', 'bd041fd6-fdf0-4b1b-8f50-f02b88c05352.webp', 'muslim-people-reading-quran-illustration-vector.webp', 'Muslim People Reading Quran Illustration Vector', 'image/webp', '520a5812-5bca-4e68-8532-5ce450750d46', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-03 14:14:39.880967+00', NULL, '2021-12-03 14:14:39.958+00', NULL, 40924, 1920, 1440, NULL, NULL, NULL, NULL, NULL, '{}', true);
INSERT INTO "public"."directus_files" VALUES ('e1be9a33-0219-4919-a2b7-2f8bd827498e', 'local', 'e1be9a33-0219-4919-a2b7-2f8bd827498e.svg', 'Arab_businessman7-18.svg', 'Team', 'image/svg+xml', '520a5812-5bca-4e68-8532-5ce450750d46', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-03 13:37:50.262488+00', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-03 13:37:59.217+00', NULL, 39080, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, true);
INSERT INTO "public"."directus_files" VALUES ('348e4117-39e0-44c4-8ad2-cbe27929fd9c', 'local', '348e4117-39e0-44c4-8ad2-cbe27929fd9c.png', 'features.png', 'Features', 'image/png', '520a5812-5bca-4e68-8532-5ce450750d46', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-03 13:56:50.157495+00', NULL, '2021-12-03 13:56:50.188+00', NULL, 55886, 1043, 663, NULL, NULL, NULL, NULL, NULL, '{"ihdr":{"ImageWidth":1043,"ImageHeight":663,"BitDepth":8,"ColorType":"Palette","Compression":"Deflate/Inflate","Filter":"Adaptive","Interlace":"Noninterlaced"}}', true);
INSERT INTO "public"."directus_files" VALUES ('e76b74d0-89ae-4268-bcce-5293fcad9fd5', 'local', 'e76b74d0-89ae-4268-bcce-5293fcad9fd5.png', 'pricing-ultimate.png', 'Pricing Ultimate', 'image/png', '520a5812-5bca-4e68-8532-5ce450750d46', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-03 14:04:32.644935+00', NULL, '2021-12-03 14:04:32.746+00', NULL, 8139, 278, 191, NULL, NULL, NULL, NULL, NULL, '{"ihdr":{"ImageWidth":278,"ImageHeight":191,"BitDepth":8,"ColorType":"Palette","Compression":"Deflate/Inflate","Filter":"Adaptive","Interlace":"Noninterlaced"}}', true);
INSERT INTO "public"."directus_files" VALUES ('2c3fa8f6-a20f-4dea-b68c-e6439cc2c5cc', 'local', '2c3fa8f6-a20f-4dea-b68c-e6439cc2c5cc.png', 'pricing-business.png', 'Pricing Business', 'image/png', '520a5812-5bca-4e68-8532-5ce450750d46', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-03 14:04:32.720302+00', NULL, '2021-12-03 14:04:32.755+00', NULL, 10763, 278, 191, NULL, NULL, NULL, NULL, NULL, '{"ihdr":{"ImageWidth":278,"ImageHeight":191,"BitDepth":8,"ColorType":"Palette","Compression":"Deflate/Inflate","Filter":"Adaptive","Interlace":"Noninterlaced"}}', true);
INSERT INTO "public"."directus_files" VALUES ('e726304d-e234-4bee-b09c-247466a36ea7', 'local', 'e726304d-e234-4bee-b09c-247466a36ea7.webp', 'muslim-couple-reading-and-studying-the-quran-during-ramadan-kareem-holy-month-vector.webp', 'Muslim Couple Reading and Studying The Quran during Ramadan Kareem Holy Month Vector', 'image/webp', '520a5812-5bca-4e68-8532-5ce450750d46', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-03 14:14:39.942358+00', NULL, '2021-12-03 14:14:39.969+00', NULL, 89898, 1920, 1536, NULL, NULL, NULL, NULL, NULL, '{}', true);
INSERT INTO "public"."directus_files" VALUES ('79f44b35-2a20-42bc-aac8-9a2434abfd89', 'local', '79f44b35-2a20-42bc-aac8-9a2434abfd89.jpg', 'muslim-people-reading-and-learning-the-quran-islamic-holy-book-vector.jpg', 'Muslim People Reading and Learning The Quran Islamic Holy Book Vector', 'image/jpeg', '520a5812-5bca-4e68-8532-5ce450750d46', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-03 14:14:39.937079+00', NULL, '2021-12-03 14:14:39.972+00', NULL, 78757, 1920, 1280, NULL, NULL, NULL, NULL, NULL, NULL, true);
INSERT INTO "public"."directus_files" VALUES ('92cd04e4-e0bb-4f9c-ba55-7414a0f1ea4e', 'local', '92cd04e4-e0bb-4f9c-ba55-7414a0f1ea4e.jpg', '360_F_198744537_QLEesLpQ9msi59KWamqXXNXcFF9FsjS8.jpg', '360 F 198744537 Ql Ees Lp Q9msi59 K Wamq Xxn Xc F F9 Fsj S8', 'image/jpeg', '520a5812-5bca-4e68-8532-5ce450750d46', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-03 14:22:01.499372+00', NULL, '2021-12-03 14:22:01.521+00', NULL, 16040, 360, 360, NULL, NULL, NULL, NULL, NULL, '{"iptc":{},"ifd0":{"XResolution":300,"YResolution":300,"ResolutionUnit":"inches","YCbCrPositioning":1}}', true);
INSERT INTO "public"."directus_files" VALUES ('49cd8be5-26d7-442a-b635-287d1ea387be', 'local', '49cd8be5-26d7-442a-b635-287d1ea387be.png', 'quran.png', 'Quran', 'image/png', '520a5812-5bca-4e68-8532-5ce450750d46', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-03 14:17:48.614315+00', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-08 06:18:55.639+00', NULL, 22229, 512, 512, NULL, NULL, NULL, NULL, NULL, '{"ihdr":{"ImageWidth":512,"ImageHeight":512,"BitDepth":8,"ColorType":"RGB with Alpha","Compression":"Deflate/Inflate","Filter":"Adaptive","Interlace":"Noninterlaced","Software":"www.inkscape.org"}}', true);
INSERT INTO "public"."directus_files" VALUES ('b300399b-855a-46ac-9293-fcf4adfd2f58', 'local', 'b300399b-855a-46ac-9293-fcf4adfd2f58.png', 'Screenshot from 2021-12-07 13-03-06.png', 'Screenshot from 2021 12 07 13 03 06', 'image/png', '520a5812-5bca-4e68-8532-5ce450750d46', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-07 07:03:43.291399+00', '2d9ba661-779d-455c-904d-614bc31b8f60', '2021-12-08 06:18:55.639+00', NULL, 176046, 1600, 815, NULL, NULL, NULL, NULL, NULL, '{"ihdr":{"ImageWidth":1600,"ImageHeight":815,"BitDepth":8,"ColorType":"RGB with Alpha","Compression":"Deflate/Inflate","Filter":"Adaptive","Interlace":"Noninterlaced","Software":"gnome-screenshot"}}', true);


--
-- Data for Name: directus_folders; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_folders" VALUES ('520a5812-5bca-4e68-8532-5ce450750d46', 'System', NULL, true);


--
-- Data for Name: directus_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_migrations" VALUES ('20201028A', 'Remove Collection Foreign Keys', '2021-11-16 07:38:22.728732+00');
INSERT INTO "public"."directus_migrations" VALUES ('20201029A', 'Remove System Relations', '2021-11-16 07:38:22.734118+00');
INSERT INTO "public"."directus_migrations" VALUES ('20201029B', 'Remove System Collections', '2021-11-16 07:38:22.739486+00');
INSERT INTO "public"."directus_migrations" VALUES ('20201029C', 'Remove System Fields', '2021-11-16 07:38:22.750742+00');
INSERT INTO "public"."directus_migrations" VALUES ('20201105A', 'Add Cascade System Relations', '2021-11-16 07:38:22.842641+00');
INSERT INTO "public"."directus_migrations" VALUES ('20201105B', 'Change Webhook URL Type', '2021-11-16 07:38:22.868434+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210225A', 'Add Relations Sort Field', '2021-11-16 07:38:22.878587+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210304A', 'Remove Locked Fields', '2021-11-16 07:38:22.884614+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210312A', 'Webhooks Collections Text', '2021-11-16 07:38:22.891485+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210331A', 'Add Refresh Interval', '2021-11-16 07:38:22.895773+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210415A', 'Make Filesize Nullable', '2021-11-16 07:38:22.905628+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210416A', 'Add Collections Accountability', '2021-11-16 07:38:22.915234+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210422A', 'Remove Files Interface', '2021-11-16 07:38:22.918893+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210506A', 'Rename Interfaces', '2021-11-16 07:38:22.950005+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210510A', 'Restructure Relations', '2021-11-16 07:38:22.979577+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210518A', 'Add Foreign Key Constraints', '2021-11-16 07:38:23.014081+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210519A', 'Add System Fk Triggers', '2021-11-16 07:38:23.070137+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210521A', 'Add Collections Icon Color', '2021-11-16 07:38:23.07541+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210525A', 'Add Insights', '2021-11-16 07:38:23.115906+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210608A', 'Add Deep Clone Config', '2021-11-16 07:38:23.122581+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210626A', 'Change Filesize Bigint', '2021-11-16 07:38:23.140532+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210716A', 'Add Conditions to Fields', '2021-11-16 07:38:23.146189+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210721A', 'Add Default Folder', '2021-11-16 07:38:23.154469+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210802A', 'Replace Groups', '2021-11-16 07:38:23.159068+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210803A', 'Add Required to Fields', '2021-11-16 07:38:23.169346+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210805A', 'Update Groups', '2021-11-16 07:38:23.173132+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210805B', 'Change Image Metadata Structure', '2021-11-16 07:38:23.176611+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210811A', 'Add Geometry Config', '2021-11-16 07:38:23.181077+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210831A', 'Remove Limit Column', '2021-11-16 07:38:23.186396+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210903A', 'Add Auth Provider', '2021-11-16 07:38:23.209105+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210907A', 'Webhooks Collections Not Null', '2021-11-16 07:38:23.217534+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210910A', 'Move Module Setup', '2021-11-16 07:38:23.225719+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210920A', 'Webhooks URL Not Null', '2021-11-16 07:38:23.233823+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210924A', 'Add Collection Organization', '2021-11-16 07:38:23.242165+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210927A', 'Replace Fields Group', '2021-11-16 07:38:23.253205+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210927B', 'Replace M2M Interface', '2021-11-16 07:38:23.256577+00');
INSERT INTO "public"."directus_migrations" VALUES ('20210929A', 'Rename Login Action', '2021-11-16 07:38:23.259691+00');
INSERT INTO "public"."directus_migrations" VALUES ('20211007A', 'Update Presets', '2021-11-16 07:38:23.267799+00');
INSERT INTO "public"."directus_migrations" VALUES ('20211009A', 'Add Auth Data', '2021-11-16 07:38:23.27198+00');
INSERT INTO "public"."directus_migrations" VALUES ('20211016A', 'Add Webhook Headers', '2021-11-16 07:38:23.276078+00');
INSERT INTO "public"."directus_migrations" VALUES ('20211103A', 'Set Unique to User Token', '2021-11-16 07:38:23.283036+00');
INSERT INTO "public"."directus_migrations" VALUES ('20211103B', 'Update Special Geometry', '2021-11-16 07:38:23.287596+00');
INSERT INTO "public"."directus_migrations" VALUES ('20211104A', 'Remove Collections Listing', '2021-11-16 07:38:23.291677+00');
INSERT INTO "public"."directus_migrations" VALUES ('20211118A', 'Add Notifications', '2021-11-25 12:28:50.232556+00');


--
-- Data for Name: directus_notifications; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: directus_panels; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: directus_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_permissions" VALUES (134, NULL, 'directus_files', 'read', '{}', '{}', NULL, '*');


--
-- Data for Name: directus_presets; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_presets" VALUES (5, NULL, '2d9ba661-779d-455c-904d-614bc31b8f60', NULL, 'theme_page_section', NULL, 'tabular', '{"tabular":{"page":1,"fields":["name","icon","page"],"sort":[]}}', '{"tabular":{"widths":{"page":297}}}', NULL, NULL);
INSERT INTO "public"."directus_presets" VALUES (2, NULL, '2d9ba661-779d-455c-904d-614bc31b8f60', NULL, 'directus_users', NULL, 'cards', '{"cards":{"sort":["email"],"page":1}}', '{"cards":{"icon":"account_circle","title":"{{ first_name }} {{ last_name }}","subtitle":"{{ email }}","size":4}}', NULL, NULL);
INSERT INTO "public"."directus_presets" VALUES (1, NULL, '2d9ba661-779d-455c-904d-614bc31b8f60', NULL, 'institute', NULL, 'tabular', '{"tabular":{"page":1}}', NULL, NULL, NULL);
INSERT INTO "public"."directus_presets" VALUES (3, NULL, '2d9ba661-779d-455c-904d-614bc31b8f60', NULL, 'theme', NULL, 'tabular', '{"tabular":{"page":1,"fields":["name","cover"]}}', NULL, NULL, NULL);
INSERT INTO "public"."directus_presets" VALUES (6, NULL, '2d9ba661-779d-455c-904d-614bc31b8f60', NULL, 'directus_files', NULL, 'cards', '{"cards":{"sort":["-uploaded_on"],"page":1}}', '{"cards":{"icon":"insert_drive_file","title":"{{ title }}","subtitle":"{{ type }} • {{ filesize }}","size":3,"imageFit":"crop"}}', NULL, NULL);
INSERT INTO "public"."directus_presets" VALUES (4, NULL, '2d9ba661-779d-455c-904d-614bc31b8f60', NULL, 'theme_page', NULL, 'tabular', '{"tabular":{"page":1,"fields":["name","icon","theme"],"sort":[]}}', NULL, NULL, NULL);


--
-- Data for Name: directus_relations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_relations" VALUES (1, 'institute', 'user_created', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (2, 'institute', 'user_updated', 'directus_users', NULL, NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (9, 'theme_page', 'theme', 'theme', 'theme_page', NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (15, 'theme_page_section', 'page', 'theme_page', 'theme_page_section', NULL, NULL, NULL, NULL, 'nullify');
INSERT INTO "public"."directus_relations" VALUES (20, 'theme', 'cover', 'directus_files', NULL, NULL, NULL, NULL, NULL, 'nullify');


--
-- Data for Name: directus_revisions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: directus_roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_roles" VALUES ('eb61ce1d-8967-4f00-be52-8cd1fb1c7c54', 'Administrator', 'supervised_user_circle', NULL, NULL, false, true, true);


--
-- Data for Name: directus_sessions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: directus_settings; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_settings" VALUES (1, 'Al-Madrasah', NULL, '#607D8B', '49cd8be5-26d7-442a-b635-287d1ea387be', NULL, '22cb1536-b477-4629-9467-71822bfc4dcd', NULL, 25, NULL, 'all', NULL, NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: directus_users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."directus_users" VALUES ('2d9ba661-779d-455c-904d-614bc31b8f60', 'SAHARA', 'IT', 'admin@saharait.com', '$argon2i$v=19$m=4096,t=3,p=1$AYp3n4IPbrxw1EzU3R5e6g$TxdFFLW23n+C5WwdR1KmYa6vqelaPupHOrYBZeSjHIo', NULL, NULL, NULL, NULL, NULL, 'en-US', 'auto', NULL, 'active', 'eb61ce1d-8967-4f00-be52-8cd1fb1c7c54', NULL, '2021-12-08 06:18:39.781+00', '/settings/project', 'default', NULL, NULL, true);


--
-- Data for Name: directus_webhooks; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: institute; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: theme; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."theme" VALUES ('al-munir', 'Al-Munir', 'b300399b-855a-46ac-9293-fcf4adfd2f58', '1.0.0');


--
-- Data for Name: theme_page; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."theme_page" VALUES ('al-munir-general', 1, 'General', 'color_lens', 'al-munir');
INSERT INTO "public"."theme_page" VALUES ('al-munir-frontpage', 2, 'Frontpage', 'article', 'al-munir');


--
-- Data for Name: theme_page_section; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."theme_page_section" VALUES ('al-munir-general-header', 1, 'Header', 'view_quilt', false, false, '[{"field":"main_menu","name":"Main Menu","type":"integer","meta":{"name":"Main Menu","field":"main_menu","type":"integer","interface":"m2o-repeater","options":{"related-collection":"menu","related-field":"id","template":"{{title}}"}}}]', 'al-munir-general');
INSERT INTO "public"."theme_page_section" VALUES ('al-munir-frontpage-values', 4, 'Values', 'done', true, true, '[{"field":"title","name":"Title","type":"string","meta":{"name":"Title","field":"title","type":"string","interface":"input","options":{"iconLeft":"title","trim":true}}},{"field":"subtitle","name":"Subtitle","type":"string","meta":{"name":"Subtitle","field":"subtitle","type":"string","interface":"input","options":{"iconLeft":"subtitles","trim":true}}},{"field":"items","name":"Items","type":"json","meta":{"name":"Items","field":"items","type":"json","interface":"list","options":{"addLabel":"Add New","fields":[{"field":"title","name":"Title","type":"string","meta":{"field":"title","type":"string","interface":"input","options":{"iconLeft":"title","trim":true},"name":"Title"}},{"field":"image","name":"Image","type":"uuid","meta":{"field":"image","type":"uuid","interface":"file-image-repeater","name":"Image"}},{"field":"description","name":"Description","type":"text","meta":{"field":"description","type":"text","interface":"input-rich-text-html","name":"Description"}}]}}}]', 'al-munir-frontpage');
INSERT INTO "public"."theme_page_section" VALUES ('al-munir-frontpage-intro', 2, 'Introduction', 'horizontal_split', true, true, '[{"field":"title","name":"Title","type":"string","meta":{"name":"Title","field":"title","type":"string","interface":"input","options":{"placeholder":null,"iconLeft":"title","trim":true}}},{"field":"description","name":"Description","type":"text","meta":{"name":"Description","field":"description","type":"text","interface":"input-rich-text-html"}},{"field":"link","name":"Link","type":"text","meta":{"name":"Link","field":"link","type":"text","interface":"input","options":{"iconLeft":"http","trim":true}}},{"field":"link_text","name":"Link Text","type":"string","meta":{"name":"Link Text","field":"link_text","type":"string","interface":"input","options":{"iconLeft":"label","trim":true}}},{"field":"image","name":"Image","type":"uuid","meta":{"name":"Image","field":"image","type":"uuid","interface":"file-image-repeater"}}]', 'al-munir-frontpage');
INSERT INTO "public"."theme_page_section" VALUES ('al-munir-general-footer-right-menu', 11, 'Footer - Right Menu', 'menu', false, false, '[{"field":"title","name":"Title","type":"string","meta":{"name":"Title","field":"title","type":"string","interface":"input","options":{"trim":true,"iconLeft":"title"}}},{"field":"links","name":"Links","type":"json","meta":{"name":"Links","field":"links","type":"json","interface":"list","options":{"fields":[{"field":"link","name":"Link","type":"string","meta":{"name":"Link","field":"link","type":"string","interface":"input","options":{"iconLeft":"http","trim":true}}},{"field":"link_text","name":"Link Text","type":"string","meta":{"name":"Link Text","field":"link_text","type":"string","interface":"input","options":{"trim":true,"iconLeft":"title"}}}]}}}]', 'al-munir-general');
INSERT INTO "public"."theme_page_section" VALUES ('al-munir-frontpage-counts', 5, 'Counts', 'looks_one', true, true, '[{"field":"counts","name":"Counts","type":"json","meta":{"name":"Counts","field":"counts","type":"json","interface":"list","options":{"fields":[{"field":"title","name":"Title","type":"string","meta":{"name":"Title","field":"title","type":"string","interface":"input","options":{"trim":true,"iconLeft":"title"}}},{"field":"icon","name":"Icon","type":"string","meta":{"name":"Icon","field":"icon","type":"string","interface":"select-icon"}},{"field":"color","name":"Color","type":"string","meta":{"name":"Color","field":"color","type":"string","interface":"select-color"}},{"field":"count","name":"Count","type":"integer","meta":{"name":"Count","field":"count","type":"integer","interface":"input","options":{"iconLeft":"money","trim":true}}}]}}}]', 'al-munir-frontpage');
INSERT INTO "public"."theme_page_section" VALUES ('al-munir-frontpage-about', 3, 'About', 'domain', true, true, '[{"field":"title","name":"Title","type":"string","meta":{"name":"Title","field":"title","type":"string","interface":"input","options":{"iconLeft":"title","trim":true}}},{"field":"subtitle","name":"Subtitle","type":"text","meta":{"name":"Subtitle","field":"subtitle","type":"text","interface":"input-rich-text-html","options":{"iconLeft":"subtitles","trim":true}}},{"field":"description","name":"Description","type":"text","meta":{"name":"Description","field":"description","type":"text","interface":"input-rich-text-html"}},{"field":"link","name":"Link","type":"string","meta":{"name":"Link","field":"link","type":"string","interface":"input","options":{"iconLeft":"http","trim":true}}},{"field":"link_text","name":"Link Text","type":"string","meta":{"name":"Link Text","field":"link_text","type":"string","interface":"input","options":{"iconLeft":"label","trim":true}}},{"field":"image","name":"Image","type":"uuid","meta":{"name":"Image","field":"image","type":"uuid","interface":"file-image-repeater"}}]', 'al-munir-frontpage');
INSERT INTO "public"."theme_page_section" VALUES ('al-munir-general-footer-left-menu', 12, 'Footer - Left Menu', 'menu', false, false, '[{"field":"title","name":"Title","type":"string","meta":{"name":"Title","field":"title","type":"string","interface":"input","options":{"iconLeft":"title","trim":true}}},{"field":"links","name":"Links","type":"json","meta":{"name":"Links","field":"links","type":"json","interface":"list","options":{"fields":[{"field":"link","name":"Link","type":"string","meta":{"name":"Link","field":"link","type":"string","interface":"input","options":{"iconLeft":"http","trim":true}}},{"field":"link_text","name":"Link Text","type":"string","meta":{"name":"Link Text","field":"link_text","type":"string","interface":"input","options":{"iconLeft":"title","trim":true}}}]}}}]', 'al-munir-general');
INSERT INTO "public"."theme_page_section" VALUES ('al-munir-general-footer-contact', 13, 'Footer - Contact', 'map', false, false, '[{"field":"title","name":"Title","type":"string","meta":{"name":"Title","field":"title","type":"string","interface":"input","options":{"trim":true,"iconLeft":"title"}}},{"field":"contact_info","name":"Contact Info","type":"text","meta":{"name":"Contact Info","field":"contact_info","type":"text","interface":"input-rich-text-html"}},{"field":"phone","name":"Phone","type":"string","meta":{"name":"Phone","field":"phone","type":"string","interface":"input","options":{"trim":true,"iconLeft":"phone_android"}}},{"field":"email","name":"Email Address","type":"string","meta":{"name":"Email Address","field":"email","type":"string","interface":"input","options":{"iconLeft":"alternate_email","trim":true}}}]', 'al-munir-general');
INSERT INTO "public"."theme_page_section" VALUES ('al-munir-frontpage-pricing', 8, 'Pricing', 'attach_money', true, true, '[{"field":"title","name":"Title","type":"string","meta":{"name":"Title","field":"title","type":"string","interface":"input","options":{"iconLeft":"title","trim":true}}},{"field":"subtitle","name":"Subtitle","type":"string","meta":{"name":"Subtitle","field":"subtitle","type":"string","interface":"input","options":{"iconLeft":"subtitles","trim":true}}},{"field":"items","name":"Items","type":"json","meta":{"name":"Items","field":"items","type":"json","interface":"list","options":{"fields":[{"field":"title","name":"Title","type":"string","meta":{"name":"Title","field":"title","type":"string","interface":"input","options":{"iconLeft":"title","trim":true}}},{"field":"price","name":"Price","type":"integer","meta":{"name":"Price","field":"price","type":"integer","interface":"input","options":{"iconLeft":"attach_money","trim":true}}},{"field":"basis","name":"Basis","type":"string","meta":{"name":"Basis","field":"basis","type":"string","interface":"input","options":{"trim":true,"iconLeft":"calendar_today"}}},{"field":"color","name":"Color","type":"string","meta":{"name":"Color","field":"color","type":"string","interface":"select-color"}},{"field":"link","name":"Link","type":"string","meta":{"name":"Link","field":"link","type":"string","interface":"input","options":{"iconLeft":"http","trim":true}}},{"field":"link_text","name":"Link Text","type":"string","meta":{"name":"Link Text","field":"link_text","type":"string","interface":"input","options":{"iconLeft":"title","trim":true}}},{"field":"features","name":"Features","type":"json","meta":{"name":"Features","field":"features","type":"json","interface":"list","options":{"fields":[{"field":"name","name":"Name","type":"string","meta":{"name":"Name","field":"name","type":"string","interface":"input","options":{"iconLeft":"title","trim":true}}},{"field":"strikethrough","name":"Strikethrough","type":"boolean","meta":{"name":"Strikethrough","field":"strikethrough","type":"boolean","interface":"boolean"}}]}}},{"field":"featured","name":"Featured","type":"string","meta":{"name":"Featured","field":"featured","type":"string","interface":"input","options":{"label":"Yes","iconLeft":"label","trim":true}}},{"field":"image","name":"Image","type":"uuid","meta":{"name":"Image","field":"image","type":"uuid","interface":"file-image-repeater"}}]}}}]', 'al-munir-frontpage');
INSERT INTO "public"."theme_page_section" VALUES ('al-munir-frontpage-features', 6, 'Features', 'featured_play_list', true, true, '[{"field":"title","name":"Title","type":"string","meta":{"name":"Title","field":"title","type":"string","interface":"input","options":{"iconLeft":"title","trim":true}}},{"field":"subtitle","name":"Subtitle","type":"text","meta":{"name":"Subtitle","field":"subtitle","type":"text","interface":"input","options":{"iconLeft":"subtitles","trim":true}}},{"field":"image","name":"Image","type":"uuid","meta":{"name":"Image","field":"image","type":"uuid","interface":"file-image-repeater"}},{"field":"features","name":"Features","type":"json","meta":{"name":"Features","field":"features","type":"json","interface":"list","options":{"fields":[{"field":"title","name":"Title","type":"string","meta":{"name":"Title","field":"title","type":"string","interface":"input","options":{"trim":true,"iconLeft":"title"}}}]}}}]', 'al-munir-frontpage');
INSERT INTO "public"."theme_page_section" VALUES ('al-munir-frontpage-testimonial', 14, 'Testimonial', 'comment_bank', true, true, '[
  {
    "field": "title",
    "name": "Title",
    "type": "string",
    "meta": {
      "name": "Title",
      "field": "title",
      "type": "string",
      "interface": "input",
      "options": {
        "iconLeft": "title",
        "trim": true
      }
    }
  },
  {
    "field": "subtitle",
    "name": "Subtitle",
    "type": "string",
    "meta": {
      "name": "Subtitle",
      "field": "subtitle",
      "type": "string",
      "interface": "input",
      "options": {
        "trim": true,
        "iconLeft": "subtitles"
      }
    }
  },
  {
    "field": "items",
    "name": "Items",
    "type": "json",
    "meta": {
      "name": "Items",
      "field": "items",
      "type": "json",
      "interface": "list",
      "options": {
        "fields": [
          {
            "field": "name",
            "name": "Name",
            "type": "string",
            "meta": {
              "name": "Name",
              "field": "name",
              "type": "string",
              "interface": "input",
              "options": {
                "trim": true,
                "iconLeft": "title"
              }
            }
          },
          {
            "field": "designation",
            "name": "Designation",
            "type": "string",
            "meta": {
              "name": "Designation",
              "field": "designation",
              "type": "string",
              "interface": "input",
              "options": {
                "trim": true
              }
            }
          },
          {
            "field": "photo",
            "name": "Photo",
            "type": "uuid",
            "meta": {
              "name": "Photo",
              "field": "photo",
              "type": "uuid",
              "interface": "file-image-repeater"
            }
          },
          {
            "field": "comment",
            "name": "Comment",
            "type": "text",
            "meta": {
              "name": "Comment",
              "field": "comment",
              "type": "text",
              "interface": "input-multiline",
              "options": {
                "trim": true
              }
            }
          }
        ]
      }
    }
  }
]', 'al-munir-frontpage');
INSERT INTO "public"."theme_page_section" VALUES ('al-munir-general-footer-about', 10, 'Footer - About', 'line_style', false, false, '[{"field":"about","name":"About","type":"text","meta":{"name":"About","field":"about","type":"text","interface":"input-rich-text-html"}},{"field":"twitter","name":"Twitter","type":"string","meta":{"name":"Twitter","field":"twitter","type":"string","interface":"input","options":{"trim":true,"iconLeft":"http"}}},{"field":"facebook","name":"Facebook","type":"string","meta":{"name":"Facebook","field":"facebook","type":"string","interface":"input","options":{"iconLeft":"http","trim":true}}},{"field":"instagram","name":"Instagram","type":"string","meta":{"name":"Instagram","field":"instagram","type":"string","interface":"input","options":{"trim":true,"iconLeft":"http"}}},{"field":"linked_in","name":"Linked In","type":"string","meta":{"name":"Linked In","field":"linked_in","type":"string","interface":"input","options":{"trim":true,"iconLeft":"http"}}}]', 'al-munir-general');
INSERT INTO "public"."theme_page_section" VALUES ('al-munir-frontpage-services', 7, 'Services', 'home_repair_service', true, true, '[{"field":"title","name":"Title","type":"string","meta":{"name":"Title","field":"title","type":"string","interface":"input","options":{"iconLeft":"title","trim":true}}},{"field":"subtitle","name":"Subtitle","type":"string","meta":{"name":"Subtitle","field":"subtitle","type":"string","interface":"input","options":{"iconLeft":"subtitles","trim":true}}},{"field":"services","name":"Services","type":"json","meta":{"name":"Services","field":"services","type":"json","interface":"list","options":{"fields":[{"field":"title","name":"Title","type":"string","meta":{"name":"Title","field":"title","type":"string","interface":"input","options":{"iconLeft":"title","trim":true}}},{"field":"description","name":"Description","type":"text","meta":{"name":"Description","field":"description","type":"text","interface":"input-rich-text-html"}},{"field":"link","name":"Link","type":"string","meta":{"name":"Link","field":"link","type":"string","interface":"input","options":{"trim":true,"iconLeft":"http"}}},{"field":"icon","name":"Icon","type":"string","meta":{"name":"Icon","field":"icon","type":"string","interface":"select-icon"}},{"field":"color","name":"Color","type":"string","meta":{"name":"Color","field":"color","type":"string","interface":"select-color","options":{"presets":null}}}]}}}]', 'al-munir-frontpage');
INSERT INTO "public"."theme_page_section" VALUES ('al-munir-frontpage-team', 9, 'Team', 'supervised_user_circle', true, true, '[{"field":"title","name":"Title","type":"string","meta":{"name":"Title","field":"title","type":"string","interface":"input","options":{"iconLeft":"title","trim":true}}},{"field":"subtitle","name":"Subtitle","type":"string","meta":{"name":"Subtitle","field":"subtitle","type":"string","interface":"input","options":{"iconLeft":"subtitles","trim":true}}},{"field":"members","name":"Members","type":"json","meta":{"name":"Members","field":"members","type":"json","interface":"list","options":{"fields":[{"field":"name","name":"Name","type":"string","meta":{"name":"Name","field":"name","type":"string","interface":"input","options":{"trim":true,"iconLeft":"title"}}},{"field":"photo","name":"Photo","type":"uuid","meta":{"name":"Photo","field":"photo","type":"uuid","interface":"file-image-repeater"}},{"field":"designation","name":"Designation","type":"string","meta":{"name":"Designation","field":"designation","type":"string","interface":"input","options":{"trim":true,"iconLeft":"verified_user"}}},{"field":"description","name":"Description","type":"text","meta":{"name":"Description","field":"description","type":"text","interface":"input-multiline","options":{"trim":true}}},{"field":"facebook","name":"Facebook","type":"string","meta":{"name":"Facebook","field":"facebook","type":"string","interface":"input","options":{"iconLeft":"http","trim":true}}},{"field":"linked_in","name":"Linked In","type":"string","meta":{"name":"Linked In","field":"linked_in","type":"string","interface":"input","options":{"iconLeft":"http","trim":true}}},{"field":"youtube","name":"Youtube","type":"string","meta":{"name":"Youtube","field":"youtube","type":"string","interface":"input","options":{"iconLeft":"http","trim":true}}}]}}}]', 'al-munir-frontpage');


--
-- Name: directus_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_activity_id_seq"', 1, false);


--
-- Name: directus_fields_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_fields_id_seq"', 78, true);


--
-- Name: directus_notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_notifications_id_seq"', 1, false);


--
-- Name: directus_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_permissions_id_seq"', 134, true);


--
-- Name: directus_presets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_presets_id_seq"', 7, true);


--
-- Name: directus_relations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_relations_id_seq"', 21, true);


--
-- Name: directus_revisions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_revisions_id_seq"', 1, false);


--
-- Name: directus_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_settings_id_seq"', 1, true);


--
-- Name: directus_webhooks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."directus_webhooks_id_seq"', 1, false);


--
-- Name: institute_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."institute_id_seq"', 1, false);


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
-- Name: directus_notifications directus_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_notifications"
    ADD CONSTRAINT "directus_notifications_pkey" PRIMARY KEY ("id");


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
-- Name: institute institute_code_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."institute"
    ADD CONSTRAINT "institute_code_unique" UNIQUE ("code");


--
-- Name: institute institute_domain_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."institute"
    ADD CONSTRAINT "institute_domain_unique" UNIQUE ("domain");


--
-- Name: institute institute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."institute"
    ADD CONSTRAINT "institute_pkey" PRIMARY KEY ("id");


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
-- Name: directus_notifications directus_notifications_recipient_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_notifications"
    ADD CONSTRAINT "directus_notifications_recipient_foreign" FOREIGN KEY ("recipient") REFERENCES "public"."directus_users"("id") ON DELETE CASCADE;


--
-- Name: directus_notifications directus_notifications_sender_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."directus_notifications"
    ADD CONSTRAINT "directus_notifications_sender_foreign" FOREIGN KEY ("sender") REFERENCES "public"."directus_users"("id");


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
-- Name: institute institute_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."institute"
    ADD CONSTRAINT "institute_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users"("id") ON DELETE SET NULL;


--
-- Name: institute institute_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."institute"
    ADD CONSTRAINT "institute_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "public"."directus_users"("id") ON DELETE SET NULL;


--
-- Name: theme theme_cover_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."theme"
    ADD CONSTRAINT "theme_cover_foreign" FOREIGN KEY ("cover") REFERENCES "public"."directus_files"("id") ON DELETE SET NULL;


--
-- Name: theme_page_section theme_page_section_page_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."theme_page_section"
    ADD CONSTRAINT "theme_page_section_page_foreign" FOREIGN KEY ("page") REFERENCES "public"."theme_page"("id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: theme_page theme_page_theme_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."theme_page"
    ADD CONSTRAINT "theme_page_theme_foreign" FOREIGN KEY ("theme") REFERENCES "public"."theme"("id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


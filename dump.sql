--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

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

SET default_table_access_method = heap;

--
-- Name: links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.links (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" character varying(120) NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT (now() AT TIME ZONE 'BRT'::text)
);


--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token character varying(120) NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT (now() AT TIME ZONE 'BRT'::text)
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email character varying(120) NOT NULL,
    password character varying(120) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT (now() AT TIME ZONE 'BRT'::text)
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: visits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.visits (
    id integer NOT NULL,
    views integer DEFAULT 1 NOT NULL,
    "linkId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT (now() AT TIME ZONE 'BRT'::text)
);


--
-- Name: visits_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.visits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: visits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.visits_id_seq OWNED BY public.visits.id;


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: visits id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits ALTER COLUMN id SET DEFAULT nextval('public.visits_id_seq'::regclass);


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.links VALUES (8, 'www.testador.com', 'o8tzu5oizM', 1, '2022-10-17 07:31:28.908431');
INSERT INTO public.links VALUES (9, 'www.facebook.com', 'GzKJDUJQ9A', 1, '2022-10-17 07:31:38.609575');
INSERT INTO public.links VALUES (10, 'www.leroy.com', 'ATakQf9vlK', 1, '2022-10-17 07:31:47.940179');
INSERT INTO public.links VALUES (11, 'www.g1.com', 'AypsiCMpZ6', 1, '2022-10-17 07:32:01.863714');
INSERT INTO public.links VALUES (12, 'californialibre.com', '_KT_nItu5d', 3, '2022-10-17 09:23:51.938357');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 'dbe70ee0-1b6a-469c-8f20-01ff3c93b0f8', 1, '2022-10-17 00:38:08.474409');
INSERT INTO public.sessions VALUES (2, 'eee7b4d1-7f69-4561-a27a-a1cb5c087646', 3, '2022-10-17 09:21:28.556622');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Johnny Bravo', 'johnny@teste.com', '$2b$11$w.f8KsX9RJ4QIBnBzfFgY.xJ.5Pe0/unyf577dj/ghn/3xYDMtQnu', '2022-10-17 00:33:59.533799');
INSERT INTO public.users VALUES (2, 'Goku', 'goku@teste.com', '$2b$11$HyutFXwJf57iniTM1OF7KecAP91y3wj3ghGJZRwue9VlUag5BTJnq', '2022-10-17 09:08:18.261887');
INSERT INTO public.users VALUES (3, 'Diego de la Vega', 'zorro@teste.com', '$2b$11$I9U/UwsmXr3NsnXfQUCdFuTlffWOctYYkuAvBU2FhMxQiNMbSErqW', '2022-10-17 09:14:27.322384');
INSERT INTO public.users VALUES (4, 'Steve Rodgers', 'capitao@teste.com', '$2b$11$k4WRK/xxV7St.ciYaERR4O5N/l2MDTdBbqFP2g5II4qdHOeOQaUNq', '2022-10-17 09:20:37.320343');


--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.visits VALUES (4, 1, 8, '2022-10-17 07:31:28.998736');
INSERT INTO public.visits VALUES (5, 1, 9, '2022-10-17 07:31:38.659226');
INSERT INTO public.visits VALUES (7, 1, 11, '2022-10-17 07:32:01.960412');
INSERT INTO public.visits VALUES (6, 2, 10, '2022-10-17 07:31:48.004414');
INSERT INTO public.visits VALUES (8, 7, 12, '2022-10-17 09:23:52.050712');


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.links_id_seq', 12, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: visits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.visits_id_seq', 8, true);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: visits visits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_pkey PRIMARY KEY (id);


--
-- Name: links links_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT "links_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: visits visits_linkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES public.links(id);


--
-- PostgreSQL database dump complete
--


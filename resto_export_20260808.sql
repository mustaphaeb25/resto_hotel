--
-- PostgreSQL database dump
--

\restrict UXS5ho4tOrbOcR2B2eb5wEIE8cqrr6sWetTCale8TQHSEevFjuZWTw9GOJDklAd

-- Dumped from database version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)

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
-- Name: ReservationStatus; Type: TYPE; Schema: public; Owner: mustapha
--

CREATE TYPE public."ReservationStatus" AS ENUM (
    'PENDING',
    'CONFIRMED',
    'CANCELLED',
    'COMPLETED'
);


ALTER TYPE public."ReservationStatus" OWNER TO mustapha;

--
-- Name: ReviewTarget; Type: TYPE; Schema: public; Owner: mustapha
--

CREATE TYPE public."ReviewTarget" AS ENUM (
    'DISH',
    'ROOM',
    'EXPERIENCE'
);


ALTER TYPE public."ReviewTarget" OWNER TO mustapha;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: mustapha
--

CREATE TYPE public."Role" AS ENUM (
    'GUEST',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO mustapha;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: mustapha
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO mustapha;

--
-- Name: contact_inquiries; Type: TABLE; Schema: public; Owner: mustapha
--

CREATE TABLE public.contact_inquiries (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text NOT NULL,
    message text NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.contact_inquiries OWNER TO mustapha;

--
-- Name: dining_reservations; Type: TABLE; Schema: public; Owner: mustapha
--

CREATE TABLE public.dining_reservations (
    id text NOT NULL,
    "userId" text,
    name text NOT NULL,
    phone text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "time" text NOT NULL,
    guests integer NOT NULL,
    seating text NOT NULL,
    status public."ReservationStatus" DEFAULT 'PENDING'::public."ReservationStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.dining_reservations OWNER TO mustapha;

--
-- Name: experience_bookings; Type: TABLE; Schema: public; Owner: mustapha
--

CREATE TABLE public.experience_bookings (
    id text NOT NULL,
    "userId" text,
    "experienceId" integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    guests integer NOT NULL,
    status public."ReservationStatus" DEFAULT 'PENDING'::public."ReservationStatus" NOT NULL,
    total_price double precision NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    email text,
    name text,
    phone text
);


ALTER TABLE public.experience_bookings OWNER TO mustapha;

--
-- Name: experiences; Type: TABLE; Schema: public; Owner: mustapha
--

CREATE TABLE public.experiences (
    id integer NOT NULL,
    name text NOT NULL,
    category text NOT NULL,
    duration text NOT NULL,
    "groupSize" text NOT NULL,
    price double precision NOT NULL,
    unit text NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.experiences OWNER TO mustapha;

--
-- Name: experiences_id_seq; Type: SEQUENCE; Schema: public; Owner: mustapha
--

CREATE SEQUENCE public.experiences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.experiences_id_seq OWNER TO mustapha;

--
-- Name: experiences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mustapha
--

ALTER SEQUENCE public.experiences_id_seq OWNED BY public.experiences.id;


--
-- Name: gallery_items; Type: TABLE; Schema: public; Owner: mustapha
--

CREATE TABLE public.gallery_items (
    id integer NOT NULL,
    category text NOT NULL,
    label text NOT NULL,
    image text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.gallery_items OWNER TO mustapha;

--
-- Name: gallery_items_id_seq; Type: SEQUENCE; Schema: public; Owner: mustapha
--

CREATE SEQUENCE public.gallery_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gallery_items_id_seq OWNER TO mustapha;

--
-- Name: gallery_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mustapha
--

ALTER SEQUENCE public.gallery_items_id_seq OWNED BY public.gallery_items.id;


--
-- Name: menu_items; Type: TABLE; Schema: public; Owner: mustapha
--

CREATE TABLE public.menu_items (
    id integer NOT NULL,
    name text NOT NULL,
    price double precision NOT NULL,
    category text NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    tags jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.menu_items OWNER TO mustapha;

--
-- Name: menu_items_id_seq; Type: SEQUENCE; Schema: public; Owner: mustapha
--

CREATE SEQUENCE public.menu_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.menu_items_id_seq OWNER TO mustapha;

--
-- Name: menu_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mustapha
--

ALTER SEQUENCE public.menu_items_id_seq OWNED BY public.menu_items.id;


--
-- Name: newsletter_subscribers; Type: TABLE; Schema: public; Owner: mustapha
--

CREATE TABLE public.newsletter_subscribers (
    id text NOT NULL,
    email text NOT NULL,
    subscribed boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.newsletter_subscribers OWNER TO mustapha;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: mustapha
--

CREATE TABLE public.reviews (
    id text NOT NULL,
    target public."ReviewTarget" NOT NULL,
    item_id integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    user_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.reviews OWNER TO mustapha;

--
-- Name: room_reservations; Type: TABLE; Schema: public; Owner: mustapha
--

CREATE TABLE public.room_reservations (
    id text NOT NULL,
    "userId" text,
    "roomId" integer NOT NULL,
    check_in timestamp(3) without time zone NOT NULL,
    check_out timestamp(3) without time zone NOT NULL,
    guests integer NOT NULL,
    status public."ReservationStatus" DEFAULT 'PENDING'::public."ReservationStatus" NOT NULL,
    total_price double precision NOT NULL,
    special_requests text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    guest_email text,
    guest_name text,
    guest_phone text
);


ALTER TABLE public.room_reservations OWNER TO mustapha;

--
-- Name: rooms; Type: TABLE; Schema: public; Owner: mustapha
--

CREATE TABLE public.rooms (
    id integer NOT NULL,
    name text NOT NULL,
    category text NOT NULL,
    badge text,
    price double precision NOT NULL,
    size text NOT NULL,
    bed text NOT NULL,
    "maxGuests" integer NOT NULL,
    description text NOT NULL,
    features text[],
    image text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.rooms OWNER TO mustapha;

--
-- Name: rooms_id_seq; Type: SEQUENCE; Schema: public; Owner: mustapha
--

CREATE SEQUENCE public.rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rooms_id_seq OWNER TO mustapha;

--
-- Name: rooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mustapha
--

ALTER SEQUENCE public.rooms_id_seq OWNED BY public.rooms.id;


--
-- Name: uploads; Type: TABLE; Schema: public; Owner: mustapha
--

CREATE TABLE public.uploads (
    id text NOT NULL,
    filename text NOT NULL,
    original_name text NOT NULL,
    mime_type text NOT NULL,
    size integer NOT NULL,
    url text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.uploads OWNER TO mustapha;

--
-- Name: users; Type: TABLE; Schema: public; Owner: mustapha
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    phone text,
    role public."Role" DEFAULT 'GUEST'::public."Role" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO mustapha;

--
-- Name: experiences id; Type: DEFAULT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.experiences ALTER COLUMN id SET DEFAULT nextval('public.experiences_id_seq'::regclass);


--
-- Name: gallery_items id; Type: DEFAULT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.gallery_items ALTER COLUMN id SET DEFAULT nextval('public.gallery_items_id_seq'::regclass);


--
-- Name: menu_items id; Type: DEFAULT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.menu_items ALTER COLUMN id SET DEFAULT nextval('public.menu_items_id_seq'::regclass);


--
-- Name: rooms id; Type: DEFAULT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.rooms ALTER COLUMN id SET DEFAULT nextval('public.rooms_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: mustapha
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
bad9494d-c6c7-4465-a9e3-b84d5811d132	039fc6de119a27f71ea54b8ee34643f1fa16f22ae0a2b54e2e5115cf15f4718f	2026-08-08 18:07:21.988205+01	20260728160108_init	\N	\N	2026-08-08 18:07:21.3385+01	1
af203571-1a6f-47d8-99a4-670cc8004da0	79ccc64a97005bcd5dcdd1702840b3dc0da307b077566223e629699f692c22b1	2026-08-08 18:07:22.03325+01	20260728163241_add_guest_info_to_room_reservations	\N	\N	2026-08-08 18:07:21.999878+01	1
502ef6d3-17c0-41fc-9a5f-f5ddb70e7e8e	7e4041a8d220ed6de048dc1688cabba542180eb38e93246ee891712214960db1	2026-08-08 18:07:22.078023+01	20260728193418_add_guest_fields_to_experience_bookings	\N	\N	2026-08-08 18:07:22.045063+01	1
9cf2e930-bcea-428b-9269-84d1003ca5be	a6d0c9e5003269f6e3fb7625d3e0b277723a233a54f257371eeef9a9697470d6	2026-08-08 18:07:22.325561+01	20260801183035_add_reviews	\N	\N	2026-08-08 18:07:22.167585+01	1
\.


--
-- Data for Name: contact_inquiries; Type: TABLE DATA; Schema: public; Owner: mustapha
--

COPY public.contact_inquiries (id, name, email, phone, subject, message, is_read, created_at) FROM stdin;
\.


--
-- Data for Name: dining_reservations; Type: TABLE DATA; Schema: public; Owner: mustapha
--

COPY public.dining_reservations (id, "userId", name, phone, date, "time", guests, seating, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: experience_bookings; Type: TABLE DATA; Schema: public; Owner: mustapha
--

COPY public.experience_bookings (id, "userId", "experienceId", date, guests, status, total_price, created_at, updated_at, email, name, phone) FROM stdin;
\.


--
-- Data for Name: experiences; Type: TABLE DATA; Schema: public; Owner: mustapha
--

COPY public.experiences (id, name, category, duration, "groupSize", price, unit, description, image, created_at, updated_at) FROM stdin;
1	Heritage Walking Tour	cultural	3 Hours	Up to 8	45	person	Explore the narrow lanes of Udaipur's old city, visit centuries-old havelis, and discover hidden temples with our expert local guide.	/This.jpeg	2026-08-08 21:19:32.018	2026-08-08 21:19:32.018
2	Cooking Masterclass	culinary	4 Hours	Up to 6	85	person	Learn the secrets of Rajasthani cuisine from Chef Arjun. Prepare classic dishes like Dal Bati Churma and Laal Maas in a hands-on session.	/Cooking Class.jpeg	2026-08-08 21:19:32.029	2026-08-08 21:19:32.029
3	Rooftop Sunset Cocktails	adventure	2 Hours	Up to 12	35	person	Watch the sun dip behind the Aravalli hills while sipping handcrafted saffron cocktails on our exclusive rooftop terrace.	/roof.jpeg	2026-08-08 21:19:32.039	2026-08-08 21:19:32.039
4	Private Lake Cruise	adventure	2.5 Hours	Up to 4	120	couple	Glide across the serene waters of Lake Pichola on a traditional wooden boat, passing the iconic Lake Palace and Jag Mandir.	/lake.jpeg	2026-08-08 21:19:32.055	2026-08-08 21:19:32.055
5	Ayurvedic Spa Journey	wellness	3 Hours	Individual	95	person	A holistic wellness experience combining traditional Abhyanga massage, herbal steam bath, and guided meditation session.	/Vaidyam.jpeg	2026-08-08 21:19:32.062	2026-08-08 21:19:32.062
6	Stargazing Night	cultural	2 Hours	Up to 10	30	person	Join our astronomer on the rooftop for a guided tour of the night sky, complete with telescopes, warm chai, and Rajasthani snacks.	https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.075	2026-08-08 21:19:32.075
\.


--
-- Data for Name: gallery_items; Type: TABLE DATA; Schema: public; Owner: mustapha
--

COPY public.gallery_items (id, category, label, image, created_at) FROM stdin;
1	rooms	Heritage Deluxe Room	https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.088
2	dining	Signature Dishes	https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.095
3	rooms	Executive Suite	https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.109
4	wellness	Spa & Wellness	https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.12
5	dining	Restaurant Ambiance	https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.131
6	events	Private Events	https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.142
7	rooms	Saffron Royal Villa	https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.153
8	dining	Wine & Spirits	https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.165
9	wellness	Infinity Pool	/pool.jpeg	2026-08-08 21:19:32.176
10	events	Rooftop Celebrations	https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.187
11	dining	Saffron Butter Lobster	/lobster.jpeg	2026-08-08 21:19:32.198
12	rooms	Saffron House Exterior	https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.21
13	wellness	Morning Yoga	https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.254
14	dining	Chocolate Fondant	https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.265
15	events	Festive Celebrations	https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.277
16	dining	Private Dining	https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:32.287
\.


--
-- Data for Name: menu_items; Type: TABLE DATA; Schema: public; Owner: mustapha
--

COPY public.menu_items (id, name, price, category, description, image, tags, created_at, updated_at) FROM stdin;
1	Saffron Butter Lobster	38	mains	Fresh rock lobster poached in saffron-infused butter with micro greens.	/lobster.jpeg	[{"type": "chef", "label": "Chef Special"}, {"type": "gf", "label": "Gluten Free"}]	2026-08-08 21:19:31.861	2026-08-08 21:19:31.861
2	Truffle Mushroom Risotto	28	mains	Arborio rice, wild forest mushrooms, black truffle shavings, and aged parmesan.	https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=300&q=80	[{"type": "vegan", "label": "Vegetarian"}]	2026-08-08 21:19:31.961	2026-08-08 21:19:31.961
3	Seared Scallops	30	starter	Pan-seared sea scallops served with cauliflower puree and crispy pancetta.	https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=300&q=80	[{"type": "gf", "label": "Gluten Free"}]	2026-08-08 21:19:31.972	2026-08-08 21:19:31.972
4	Chocolate Fondant	16	dessert	Warm dark chocolate cake with a molten center, served with pistachios and gelato.	https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&q=80	[{"type": "chef", "label": "Popular"}]	2026-08-08 21:19:31.985	2026-08-08 21:19:31.985
5	Saffron & Sea Bass	34	mains	Pan-seared sea bass with saffron velouté, asparagus, heirloom tomatoes.	https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=80	[{"type": "chef", "label": "Chef Special"}]	2026-08-08 21:19:31.995	2026-08-08 21:19:31.995
6	Royal Saffron Elixir	18	drinks	Artisanal gin infused with saffron threads, cardamom, fresh citrus, and gold leaf.	https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80	[{"type": "chef", "label": "Signature Drink"}]	2026-08-08 21:19:32.006	2026-08-08 21:19:32.006
\.


--
-- Data for Name: newsletter_subscribers; Type: TABLE DATA; Schema: public; Owner: mustapha
--

COPY public.newsletter_subscribers (id, email, subscribed, created_at) FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: mustapha
--

COPY public.reviews (id, target, item_id, rating, comment, user_id, created_at) FROM stdin;
c0405f3d-4719-43cc-887d-a77eb64191d7	DISH	1	5	The saffron butter lobster is pure indulgence. Perfectly cooked and beautifully plated.	994f89f6-a31c-496e-afb7-93f9a21636e8	2026-08-08 21:19:32.455
844efed0-a306-44dc-a672-fc8edd00d298	DISH	1	4	Rich and buttery, loved the micro greens on top.	\N	2026-08-08 21:19:32.513
5079037a-2a1b-40ef-84d6-7431199861d7	DISH	2	5	Creamiest risotto I have ever tasted. The truffle aroma is incredible.	\N	2026-08-08 21:19:32.522
f15f18af-04e7-40d9-ac03-e4e0b773b541	DISH	3	4	Beautifully seared scallops with a crispy finish.	\N	2026-08-08 21:19:32.535
a66402ff-2a21-4d38-990a-883b4efa6eeb	DISH	4	5	Molten center was perfect. A must for dessert lovers.	\N	2026-08-08 21:19:32.545
58a9de94-22d0-4176-ae46-fd3895e64995	DISH	5	5	The sea bass melted in my mouth. The saffron velouté is a masterpiece.	\N	2026-08-08 21:19:32.555
5654adc4-9462-4006-9639-9fcd5864aeaf	DISH	6	5	Elegant, aromatic, and subtly sweet. A signature drink for a reason.	\N	2026-08-08 21:19:32.567
ac76802f-0bba-4b7d-a8e2-718941763b5c	ROOM	1	5	Beautiful heritage room with a gorgeous garden view.	\N	2026-08-08 21:19:32.578
356509bf-73db-4e6d-8c5b-3bf44ba58d2e	ROOM	2	4	Spacious suite, loved the private terrace.	\N	2026-08-08 21:19:32.59
c599254f-235f-494e-8640-01ffef53b331	ROOM	3	5	The private plunge pool and butler service were unforgettable.	\N	2026-08-08 21:19:32.612
aeea6f4a-b403-49b8-bb45-8170ee1ef889	ROOM	4	4	Stunning lake views, very serene.	\N	2026-08-08 21:19:32.623
7b2207b0-f7b9-411f-862e-8113a4098703	ROOM	5	5	A romantic paradise. The freestanding bathtub was a dream.	\N	2026-08-08 21:19:32.636
9b231262-f7a9-42e5-82ae-3c8c7737cf55	EXPERIENCE	1	5	Fascinating tour, our guide was incredibly knowledgeable.	\N	2026-08-08 21:19:32.646
bb75846b-c95d-4b28-8473-c2fb30d590ee	EXPERIENCE	2	5	Learned so much from Chef Arjun. Hands-on and delicious.	\N	2026-08-08 21:19:32.657
b5d2ee7b-7c61-49da-8bd3-89009a12c593	EXPERIENCE	3	4	Gorgeous sunset and the saffron cocktails were amazing.	\N	2026-08-08 21:19:32.668
2aef96fe-82d0-40b1-874b-568787e26f49	EXPERIENCE	5	5	The most relaxing three hours of our entire trip.	\N	2026-08-08 21:19:32.68
\.


--
-- Data for Name: room_reservations; Type: TABLE DATA; Schema: public; Owner: mustapha
--

COPY public.room_reservations (id, "userId", "roomId", check_in, check_out, guests, status, total_price, special_requests, created_at, updated_at, guest_email, guest_name, guest_phone) FROM stdin;
\.


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: mustapha
--

COPY public.rooms (id, name, category, badge, price, size, bed, "maxGuests", description, features, image, created_at, updated_at) FROM stdin;
1	Heritage Deluxe Room	room	Popular	220	38 m²	1 King Bed	2	Featuring traditional handcrafted furnishings, private marble bath, and stunning courtyard garden views.	{"Free High-Speed Wi-Fi","Breakfast Included","Smart TV"}	https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:31.663	2026-08-08 21:19:31.663
2	Executive Suite	suite	Suite	340	58 m²	1 Super King	3	Expansive suite with a separate lounge living area, private terrace, and deep soaking bathtub.	{"Private Terrace","Free Wi-Fi","Espresso Machine"}	https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:31.699	2026-08-08 21:19:31.699
3	Saffron Royal Villa	villa	Exclusive	550	110 m²	2 King Beds	4	Ultimate luxury featuring a private plunge pool, dedicated butler service, and panoramic lake views.	{"Private Plunge Pool","24/7 Butler","Airport Transfer"}	https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:31.727	2026-08-08 21:19:31.727
4	Lakeview Terrace Room	room	New	260	42 m²	1 King Bed	2	Wake up to breathtaking lake views from your private terrace, with modern minimalist décor and a rain shower.	{"Lake View Terrace","Free Wi-Fi","Rain Shower"}	https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:31.738	2026-08-08 21:19:31.738
5	Garden Honeymoon Suite	suite	Romantic	380	65 m²	1 Super King	2	An intimate retreat surrounded by lush gardens, featuring a freestanding bathtub and private balcony.	{"Freestanding Bathtub","Private Balcony","Champagne Welcome"}	https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:31.815	2026-08-08 21:19:31.815
6	Heritage Presidential Suite	villa	Premium	720	150 m²	2 King Beds	5	Our finest accommodation with hand-painted frescoes, a private dining room, personal chef, and wraparound terrace with panoramic views.	{"Personal Chef","Private Dining","Wraparound Terrace"}	https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=600&q=80	2026-08-08 21:19:31.85	2026-08-08 21:19:31.85
\.


--
-- Data for Name: uploads; Type: TABLE DATA; Schema: public; Owner: mustapha
--

COPY public.uploads (id, filename, original_name, mime_type, size, url, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: mustapha
--

COPY public.users (id, name, email, password, phone, role, created_at, updated_at) FROM stdin;
994f89f6-a31c-496e-afb7-93f9a21636e8	Admin	admin@saffronhouse.com	$2b$12$NOXnKFZ1muV2wKXG.3GR7uo/g5ymEyx0RVwGBI5iQ0iwLwzO3.BiK	\N	ADMIN	2026-08-08 21:19:31.469	2026-08-08 21:19:31.469
\.


--
-- Name: experiences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mustapha
--

SELECT pg_catalog.setval('public.experiences_id_seq', 7, false);


--
-- Name: gallery_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mustapha
--

SELECT pg_catalog.setval('public.gallery_items_id_seq', 17, false);


--
-- Name: menu_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mustapha
--

SELECT pg_catalog.setval('public.menu_items_id_seq', 7, false);


--
-- Name: rooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mustapha
--

SELECT pg_catalog.setval('public.rooms_id_seq', 7, false);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: contact_inquiries contact_inquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.contact_inquiries
    ADD CONSTRAINT contact_inquiries_pkey PRIMARY KEY (id);


--
-- Name: dining_reservations dining_reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.dining_reservations
    ADD CONSTRAINT dining_reservations_pkey PRIMARY KEY (id);


--
-- Name: experience_bookings experience_bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.experience_bookings
    ADD CONSTRAINT experience_bookings_pkey PRIMARY KEY (id);


--
-- Name: experiences experiences_pkey; Type: CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.experiences
    ADD CONSTRAINT experiences_pkey PRIMARY KEY (id);


--
-- Name: gallery_items gallery_items_pkey; Type: CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.gallery_items
    ADD CONSTRAINT gallery_items_pkey PRIMARY KEY (id);


--
-- Name: menu_items menu_items_pkey; Type: CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT menu_items_pkey PRIMARY KEY (id);


--
-- Name: newsletter_subscribers newsletter_subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.newsletter_subscribers
    ADD CONSTRAINT newsletter_subscribers_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: room_reservations room_reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.room_reservations
    ADD CONSTRAINT room_reservations_pkey PRIMARY KEY (id);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- Name: uploads uploads_pkey; Type: CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT uploads_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: newsletter_subscribers_email_key; Type: INDEX; Schema: public; Owner: mustapha
--

CREATE UNIQUE INDEX newsletter_subscribers_email_key ON public.newsletter_subscribers USING btree (email);


--
-- Name: reviews_target_item_id_user_id_key; Type: INDEX; Schema: public; Owner: mustapha
--

CREATE UNIQUE INDEX reviews_target_item_id_user_id_key ON public.reviews USING btree (target, item_id, user_id);


--
-- Name: uploads_filename_key; Type: INDEX; Schema: public; Owner: mustapha
--

CREATE UNIQUE INDEX uploads_filename_key ON public.uploads USING btree (filename);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: mustapha
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: dining_reservations dining_reservations_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.dining_reservations
    ADD CONSTRAINT "dining_reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: experience_bookings experience_bookings_experienceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.experience_bookings
    ADD CONSTRAINT "experience_bookings_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES public.experiences(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: experience_bookings experience_bookings_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.experience_bookings
    ADD CONSTRAINT "experience_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: room_reservations room_reservations_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.room_reservations
    ADD CONSTRAINT "room_reservations_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public.rooms(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: room_reservations room_reservations_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mustapha
--

ALTER TABLE ONLY public.room_reservations
    ADD CONSTRAINT "room_reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict UXS5ho4tOrbOcR2B2eb5wEIE8cqrr6sWetTCale8TQHSEevFjuZWTw9GOJDklAd


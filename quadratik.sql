--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Debian 12.2-2.pgdg100+1)
-- Dumped by pg_dump version 12.2 (Debian 12.2-2.pgdg100+1)

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
-- Name: admin; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.admin (
    id integer NOT NULL,
    "user" text,
    hashpwd text,
    userid character varying
);


ALTER TABLE public.admin OWNER TO fanchovh;

--
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: fanchovh
--

CREATE SEQUENCE public.admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_id_seq OWNER TO fanchovh;

--
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fanchovh
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;


--
-- Name: boxtal; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.boxtal (
    userid character varying,
    collection_date date NOT NULL,
    prix_boxtal numeric NOT NULL,
    livraison_date date NOT NULL,
    service character varying NOT NULL,
    date_commande numeric,
    reference character varying
);


ALTER TABLE public.boxtal OWNER TO fanchovh;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    pid character varying NOT NULL,
    userid character varying,
    quantite numeric,
    reduction character varying,
    sous_total character varying,
    montanttotal integer,
    fdp integer,
    prix integer,
    hauteur integer,
    poids integer,
    unites integer,
    quantite_totale integer,
    nom character varying,
    nbcolis integer,
    montanthorsfdp integer,
    cartid numeric
);


ALTER TABLE public.cart OWNER TO fanchovh;

--
-- Name: cart_id_seq; Type: SEQUENCE; Schema: public; Owner: fanchovh
--

CREATE SEQUENCE public.cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_id_seq OWNER TO fanchovh;

--
-- Name: cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fanchovh
--

ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;


--
-- Name: collection; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.collection (
    col_id integer NOT NULL,
    name text NOT NULL,
    desc_collection text NOT NULL,
    folder text
);


ALTER TABLE public.collection OWNER TO fanchovh;

--
-- Name: collection_id_seq; Type: SEQUENCE; Schema: public; Owner: fanchovh
--

CREATE SEQUENCE public.collection_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.collection_id_seq OWNER TO fanchovh;

--
-- Name: collection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fanchovh
--

ALTER SEQUENCE public.collection_id_seq OWNED BY public.collection.col_id;


--
-- Name: commande; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.commande (
    id integer NOT NULL,
    mode character varying,
    amount numeric,
    expirationdate character varying,
    transactionid character varying,
    status character varying,
    userid text,
    date text,
    method text,
    profileid text,
    orderid numeric
);


ALTER TABLE public.commande OWNER TO fanchovh;

--
-- Name: commande_id_seq; Type: SEQUENCE; Schema: public; Owner: fanchovh
--

CREATE SEQUENCE public.commande_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.commande_id_seq OWNER TO fanchovh;

--
-- Name: commande_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fanchovh
--

ALTER SEQUENCE public.commande_id_seq OWNED BY public.commande.id;


--
-- Name: devis; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.devis (
    entreprise character varying NOT NULL,
    code_postal character varying NOT NULL,
    mail character varying NOT NULL,
    adresse character varying NOT NULL,
    pays character varying NOT NULL,
    siret character varying NOT NULL,
    telephone character varying NOT NULL,
    ville character varying NOT NULL,
    titulaire character varying NOT NULL,
    iban character varying NOT NULL,
    bic character varying NOT NULL,
    date_devis character varying NOT NULL,
    date_val character varying NOT NULL,
    numero integer NOT NULL,
    moyen_paiement character varying,
    userid character varying NOT NULL,
    acompte character varying,
    logo boolean,
    id integer NOT NULL
);


ALTER TABLE public.devis OWNER TO fanchovh;

--
-- Name: devis_id_seq; Type: SEQUENCE; Schema: public; Owner: fanchovh
--

CREATE SEQUENCE public.devis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.devis_id_seq OWNER TO fanchovh;

--
-- Name: devis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fanchovh
--

ALTER SEQUENCE public.devis_id_seq OWNED BY public.devis.id;


--
-- Name: informations; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.informations (
    nomentreprise character varying NOT NULL,
    adresse character varying NOT NULL,
    siret character varying NOT NULL,
    sirene character varying NOT NULL,
    ape character varying NOT NULL,
    codepostal character varying,
    ville character varying,
    pays character varying,
    mail character varying,
    telephone character varying,
    iban character varying,
    bic character varying,
    titulaire character varying,
    logo character varying
);


ALTER TABLE public.informations OWNER TO fanchovh;

--
-- Name: livraison; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.livraison (
    id integer NOT NULL,
    livr_mode text NOT NULL,
    livr_nom text NOT NULL,
    livr_adresse text NOT NULL,
    livr_ville text NOT NULL,
    livr_postal text NOT NULL,
    userid text,
    livr_service text,
    operateur text,
    livr_pays text
);


ALTER TABLE public.livraison OWNER TO fanchovh;

--
-- Name: livraison_id_seq; Type: SEQUENCE; Schema: public; Owner: fanchovh
--

CREATE SEQUENCE public.livraison_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.livraison_id_seq OWNER TO fanchovh;

--
-- Name: livraison_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fanchovh
--

ALTER SEQUENCE public.livraison_id_seq OWNED BY public.livraison.id;


--
-- Name: news; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.news (
    id integer NOT NULL,
    page text NOT NULL,
    titre text,
    description text,
    img text,
    link text
);


ALTER TABLE public.news OWNER TO fanchovh;

--
-- Name: product; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.product (
    id integer NOT NULL,
    nom text NOT NULL,
    prix integer NOT NULL,
    "nbColors" integer,
    "collectionId" integer NOT NULL,
    performance integer,
    packaging integer,
    src text,
    filter text,
    top integer,
    stock text
);


ALTER TABLE public.product OWNER TO fanchovh;

--
-- Name: product_colors; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.product_colors (
    nbcolors integer NOT NULL,
    prixcolors double precision,
    prixcolorsclient numeric
);


ALTER TABLE public.product_colors OWNER TO fanchovh;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: fanchovh
--

CREATE SEQUENCE public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO fanchovh;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fanchovh
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: product_packaging; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.product_packaging (
    fraisdeport numeric NOT NULL,
    carton numeric,
    papierbulle numeric,
    dimensions character varying,
    prix_carton numeric
);


ALTER TABLE public.product_packaging OWNER TO fanchovh;

--
-- Name: product_performances; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.product_performances (
    type integer NOT NULL,
    frequence text NOT NULL,
    classement text NOT NULL,
    graph text NOT NULL,
    desc_product text NOT NULL,
    prof numeric,
    surface numeric,
    taillecellule numeric,
    longueur numeric,
    largeur numeric,
    nbpieces numeric,
    nbcarreaux numeric,
    nbcellules numeric,
    unite integer,
    poids integer
);


ALTER TABLE public.product_performances OWNER TO fanchovh;

--
-- Name: product_prof; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.product_prof (
    profondeur integer,
    surface numeric,
    performance integer
);


ALTER TABLE public.product_prof OWNER TO fanchovh;

--
-- Name: promo; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public.promo (
    code text,
    reduction numeric
);


ALTER TABLE public.promo OWNER TO fanchovh;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    sid character varying(255) NOT NULL,
    sess json NOT NULL,
    expired timestamp with time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: fanchovh
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    userid text NOT NULL,
    nom text,
    prenom text,
    adresse text,
    postal text,
    mail text,
    telephone text,
    contexte text,
    ville text,
    pays text
);


ALTER TABLE public."user" OWNER TO fanchovh;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: fanchovh
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO fanchovh;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fanchovh
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- Name: cart id; Type: DEFAULT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);


--
-- Name: collection col_id; Type: DEFAULT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.collection ALTER COLUMN col_id SET DEFAULT nextval('public.collection_id_seq'::regclass);


--
-- Name: commande id; Type: DEFAULT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.commande ALTER COLUMN id SET DEFAULT nextval('public.commande_id_seq'::regclass);


--
-- Name: devis id; Type: DEFAULT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.devis ALTER COLUMN id SET DEFAULT nextval('public.devis_id_seq'::regclass);


--
-- Name: livraison id; Type: DEFAULT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.livraison ALTER COLUMN id SET DEFAULT nextval('public.livraison_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.admin (id, "user", hashpwd, userid) FROM stdin;
1	fanch44@hotmail.com	$2b$10$o7cLDy5qXKpsDK62NtPf8uUU7lKR0ZKN7zCGgh50HGjoWQlk.MW0S	w-yzLPlYv0VKuRGwbvJXVimQtpFUM-kG
\.


--
-- Data for Name: boxtal; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.boxtal (userid, collection_date, prix_boxtal, livraison_date, service, date_commande, reference) FROM stdin;
w-yzLPlYv0VKuRGwbvJXVimQtpFUM-kG	2019-11-21	5.69	2019-11-27	Relais Colis	1574321170988	1904288510SOGP1P4UFR
\.


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.cart (id, pid, userid, quantite, reduction, sous_total, montanttotal, fdp, prix, hauteur, poids, unites, quantite_totale, nom, nbcolis, montanthorsfdp, cartid) FROM stdin;
\.


--
-- Data for Name: collection; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.collection (col_id, name, desc_collection, folder) FROM stdin;
1	Klassik	La collection classique garde le caractère brut d'un bois selectionné et doux au toucher.	Klassik
2	Organik\n	La collection Organik montre des diffuseurs aux couleurs naturelles illustrant le caractère et la robustesse du bois. \nElle s'adresse aux studios de forte personnalité, appréciant les contrastes et les couleurs brunes, chaudes.	Organik\n
3	Botanik	La collection Botanik repose sur les couleurs apaisantes, inspirées de la nature et du jardin.\nLes diffuseurs sont discrets, non-intrusifs et amène une forme de sérénité pour l'esprit et son inspiration.	Botanik
4	Minimalik	La collection Minimalik est ambitieuse avec un design comtemporain et minimaliste.\nElle s'adapte aux studios qui aiment mélanger rigueur avec quelques pointes de fantaisie.	Minimalik
5	Gamik	La collection Gamik est une référence amusante au monde du jeu vidéo.\nDestinée aux studios ambitieux qui aiment garder de l'energie avec ces références délirantes connues de tous.	Gamik
6	Giantik\n	Ce Pack de 6 diffuseurs de type 7 x 7 cellules doit  être disposé selon un ordre préétabli ! Suivez notre guide! :)	Giantik\n
7	Pack de 5 Diffuseurs	Choisissez le pack de 5 diffuseurs pour profiter d'une réduction de 4%.	Pack-5
8	Pack de 10 Diffuseurs	Choisissez ce pack de 10 diffuseurs pour profiter de notre plus grande réduction (6%).	Pack-10
9	Absorbeurs	Un absorbeur efficace à un prix compétitif!	Absorbeur
10	Esthetik	La collection esthetik propose le modèle Woodik-7 en quatres couleurs différentes. Elle permet de le rendre discret ou en harmonie avec votre intérieur.	Esthetik
11	Pack Home Studio	Choisissez ce pack de 5 éléments pour profiter d'un prix imbattable, idéal pour commencer!	Pack-5
\.


--
-- Data for Name: commande; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.commande (id, mode, amount, expirationdate, transactionid, status, userid, date, method, profileid, orderid) FROM stdin;
\.


--
-- Data for Name: devis; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.devis (entreprise, code_postal, mail, adresse, pays, siret, telephone, ville, titulaire, iban, bic, date_devis, date_val, numero, moyen_paiement, userid, acompte, logo, id) FROM stdin;
\.


--
-- Data for Name: informations; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.informations (nomentreprise, adresse, siret, sirene, ape, codepostal, ville, pays, mail, telephone, iban, bic, titulaire, logo) FROM stdin;
Quadratik.fr	1 Rue d'aubigné	83529797900014	835297979	1629Z	35440	Feins	France	atelier@quadratik.fr	0631927481	FR76 1380 7005 8132 3192 3592 810	CCBPFRPPNAN	MR FANCH CAVELLEC	/images/logo/logo_cercle.svg
\.


--
-- Data for Name: livraison; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.livraison (id, livr_mode, livr_nom, livr_adresse, livr_ville, livr_postal, userid, livr_service, operateur, livr_pays) FROM stdin;
\.


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.news (id, page, titre, description, img, link) FROM stdin;
5	home	Quadratik.fr met en pause son activité	En raison du contexte actuel, nous préfèrons cesser notre activité le temps du confinement afin de ne pas surcharger les réseaux de transports. Nous allons en profiter pour nettoyer l'atelier ;)	https://www.aefe.fr/sites/default/files/styles/full/public/assets/images/coronavirus.jpg?itok=le_9aLQd	/
4	home	Quadratik.fr Les frais de ports deviennent GRATUITS	Désormais, pour toute commande livrée en point relais, nous prenons en charge les frais de ports!	https://images.assetsdelivery.com/compings_v2/mayrum/mayrum1901/mayrum190100054.jpg	/shop
1	shop	Indik-7 : Le Diffuseur 1D est enfin arrivé !	Nous sommes heureux de répondre enfin aux personnes désirant équiper leurs studios de diffuseurs 1D. En version assemblable ou non !	/images/modeles/Organik/indik.png	/produitindik
3	home	Indik-7 : Le Diffuseur 1D est enfin arrivé !	Nous sommes heureux de répondre enfin aux personnes désirant équiper leurs studios de diffuseurs 1D. En version assemblable ou non !	/images/modeles/Organik/indik.png	/produitindik
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.product (id, nom, prix, "nbColors", "collectionId", performance, packaging, src, filter, top, stock) FROM stdin;
17	Giant-K7-DIF6	350	3	6	716	18	pack_tape	pack	\N	Fabrication sur commande
18	Giant-Headphone-DIF6	350	2	6	716	18	pack_headphone	pack	\N	Fabrication sur commande
22	Pack 5 Woodik	290	0	7	715	12	pack_5	pack	\N	Fabrication sur commande
23	Pack 10 Woodik	580	0	8	7110	24	pack_10	pack	\N	Fabrication sur commande
27	Quadrawhite	62	1	9	1	3	quadrawhite	absorbeur	\N	Fabrication sur commande
28	Quadrared	62	1	9	1	3	quadrared	absorbeur	\N	Fabrication sur commande
29	Quadrablue	62	1	9	1	3	quadrablue	absorbeur	\N	Fabrication sur commande
34	Pack 10 Woodik Noirs	658	1	8	7110	24	pack_woodikblack	pack	\N	Fabrication sur commande
35	Pack Home Studio 5	300	1	11	50	0	pack_mix5	pack	\N	Fabrication sur commande
26	Quadrablack	62	1	9	1	3	quadrablack	absorbeur	\N	Expedition Express (4 Disponibles)
1	Woodik-7	60	0	2	71	3	woodik	diffuseur classique	1	Expedition Express (8 disponibles)
36	Indik-7	90	0	2	70	3	indik	classique	\N	Expedition Express (2 disponibles)
4	Wenge-7	66	1	2	71	3	wenge	couleur	\N	Fabrication sur commande
5	Teck-7	78	2	2	71	3	teck	couleur	\N	Fabrication sur commande
6	Spaceship-7	78	2	5	71	3	spaceship	couleur	\N	Fabrication sur commande
7	Snake-7	78	2	5	71	3	snake	couleur	\N	Fabrication sur commande
8	Romal-7	78	2	4	71	3	romal	couleur	3	Fabrication sur commande
9	Orelo-7	78	2	4	71	3	orelo	couleur	\N	Fabrication sur commande
10	Mario-7	85	3	5	71	3	mario	couleur	\N	Fabrication sur commande
11	Liseron Bleu-7	85	3	3	71	3	liseron	couleur	\N	Fabrication sur commande
12	Lichen-7	85	3	3	71	3	lichen	couleur	\N	Fabrication sur commande
13	Klio-7	58	3	4	71	3	klio	couleur	\N	Fabrication sur commande
15	Invader-7	78	2	5	71	3	invader	couleur	\N	Fabrication sur commande
16	Gruk-7	78	2	4	71	3	gruk	couleur	4	Fabrication sur commande
19	Chêne-7	78	2	2	71	3	chene	couleur	\N	Fabrication sur commande
20	Aubergine-7	78	2	3	71	3	aubergine	couleur	\N	Fabrication sur commande
21	Anemone-7	85	3	3	71	3	anemone	couleur	2	Fabrication sur commande
30	Woodik-black-7	70	1	10	71	3	woodikblack	couleur	\N	Fabrication sur commande
31	Woodik-white-7	70	1	10	71	3	wip	couleur	\N	En cours de conception
32	Woodik-anthracite-7	75	1	10	71	3	wip	couleur	\N	En cours de conception
33	Woodik-carmen-7	72	1	10	71	3	wip	couleur	\N	En cours de conception
\.


--
-- Data for Name: product_colors; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.product_colors (nbcolors, prixcolors, prixcolorsclient) FROM stdin;
0	0	0
1	1.25	5
2	2.5	8
3	3.75	12
\.


--
-- Data for Name: product_packaging; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.product_packaging (fraisdeport, carton, papierbulle, dimensions, prix_carton) FROM stdin;
4	1	0.5	55x55x50	6.26
3	1	0.50	55x55x50	6.26
12	1	0.5	55x55x50	6.26
24	1	0.5	55x55x50	6.26
18	1	0.5	55x55x50	6.26
0	1	0.5	55x55x50	6.26
\.


--
-- Data for Name: product_performances; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.product_performances (type, frequence, classement, graph, desc_product, prof, surface, taillecellule, longueur, largeur, nbpieces, nbcarreaux, nbcellules, unite, poids) FROM stdin;
1	500-20000	5	[1,1,2,3 ,4 ,5 ,5 ,5 ,5 ,5 ,5 ,3 ,2 ,1 ,1, 1 ]	L'absorbeur Quadratik absorbe les fréquences médiums et aigües. Il se combine parfaitement avec les autres diffuseurs de la gamme Quadratik.	10	0.2	500	50	50	4	0	0	1	2
61	1475-2150	2	[1,1,2,3 ,4 ,5 ,5 ,5 ,5 ,5 ,4 ,3 ,2 ,1 ,1, 1 ]	Le modèle standard bien connu des studios professionels et amateurs.	10	0.95	78	50	50	14	36	6	1	2
71	1475-2600	4	[1,1,2,3 ,4 ,5 ,5 ,5 ,5 ,5 ,5 ,3 ,2 ,1 ,1, 1 ]	Le modèle 7 cellules travaille dans les mediums-aigus de votre pièce.	10	1.05	68	50	50	16	49	7	1	2
72	738-2150	3	[2,3,4,5 ,5 ,5 ,5 ,5 ,5 ,5 ,4 ,3 ,2 ,1 ,1, 1 ]	Le modèle 7 cellules travaille dans les mediums-aigus de votre pièce. 	15	1.45	68	50	50	16	49	7	1	2
73	492-1755	5	[4,5,5,5 ,5 ,5 ,5 ,5 ,5 ,5 ,4 ,3 ,2 ,1 ,1, 1 ]	Le modèle 7 cellules avec une profondeur de 15cm est idéal pour un traitement esthetique passe-partout! 	20	1.85	68	50	50	16	49	7	1	2
7110	1475-2600	4	[1,1,2,3 ,4 ,5 ,5 ,5 ,5 ,5 ,5 ,3 ,2 ,1 ,1, 1 ]	Le pack 10 diffuseurs de 7 cellules avec une profondeur de 10cm est idéal pour un traitement esthetique passe-partout!	10	6.3	68	50	50	16	49	294	10	2
715	1475-2600	4	[1,1,2,3 ,4 ,5 ,5 ,5 ,5 ,5 ,5 ,3 ,2 ,1 ,1, 1 ]	Le pack comprend 5 diffuseurs de 7 cellules avec une profondeur de 10cm est idéal pour un traitement esthetique passe-partout!	10	6.3	68	50	50	16	49	294	5	2
716	1475-2600	4	[1,1,2,3 ,4 ,5 ,5 ,5 ,5 ,5 ,5 ,3 ,2 ,1 ,1, 1 ]	Le pack Giant 6 diffuseurs de 7 cellules avec une profondeur de 10cm est idéal pour un traitement esthetique passe-partout!	10	6.3	68	50	50	16	49	294	6	2
70	983-3583	2	[1,1,2,3 ,4 ,5 ,5 ,5 ,5 ,5 ,5 ,3 ,2 ,1 ,1, 1 ]	Le modèle 7 cellules travaille dans les mediums-aigus de votre pièce.	10	1.2	81	60	60	17	7	7	1	2
50	1475-2600	4	[1,1,2,3 ,4 ,5 ,5 ,5 ,5 ,5 ,5 ,3 ,2 ,1 ,1, 1 ]	La Pack Home Studio 5 propose un ensemble pour traiter une petite pièce. Il comprend 2 absorbeurs et 3 diffuseurs.	10	6.3	68	50	50	16	49	294	5	2
\.


--
-- Data for Name: product_prof; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.product_prof (profondeur, surface, performance) FROM stdin;
10	0.8	71
15	1.2	72
20	1.4	73
\.


--
-- Data for Name: promo; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public.promo (code, reduction) FROM stdin;
AUDIO7	3
DIF210	5
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (sid, sess, expired) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: fanchovh
--

COPY public."user" (id, userid, nom, prenom, adresse, postal, mail, telephone, contexte, ville, pays) FROM stdin;
\.


--
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fanchovh
--

SELECT pg_catalog.setval('public.admin_id_seq', 6, true);


--
-- Name: cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fanchovh
--

SELECT pg_catalog.setval('public.cart_id_seq', 849, true);


--
-- Name: collection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fanchovh
--

SELECT pg_catalog.setval('public.collection_id_seq', 1, false);


--
-- Name: commande_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fanchovh
--

SELECT pg_catalog.setval('public.commande_id_seq', 174, true);


--
-- Name: devis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fanchovh
--

SELECT pg_catalog.setval('public.devis_id_seq', 64, true);


--
-- Name: livraison_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fanchovh
--

SELECT pg_catalog.setval('public.livraison_id_seq', 251, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fanchovh
--

SELECT pg_catalog.setval('public.product_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fanchovh
--

SELECT pg_catalog.setval('public.user_id_seq', 520, true);


--
-- Name: admin admin_pk; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pk PRIMARY KEY (id);


--
-- Name: cart cart_pk; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pk PRIMARY KEY (id);


--
-- Name: collection collection_pk; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.collection
    ADD CONSTRAINT collection_pk PRIMARY KEY (col_id);


--
-- Name: commande commande_pk; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.commande
    ADD CONSTRAINT commande_pk PRIMARY KEY (id);


--
-- Name: devis devis_pkey; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.devis
    ADD CONSTRAINT devis_pkey PRIMARY KEY (id);


--
-- Name: livraison livraison_pk; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.livraison
    ADD CONSTRAINT livraison_pk PRIMARY KEY (id);


--
-- Name: product_performances modele_type_pk; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.product_performances
    ADD CONSTRAINT modele_type_pk PRIMARY KEY (type);


--
-- Name: informations name; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.informations
    ADD CONSTRAINT name PRIMARY KEY (nomentreprise);


--
-- Name: news news_pk; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pk PRIMARY KEY (id);


--
-- Name: product_colors product_colors_nbcolors_pk; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.product_colors
    ADD CONSTRAINT product_colors_nbcolors_pk PRIMARY KEY (nbcolors);


--
-- Name: product_packaging product_packaging_fraisdeport_pk; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.product_packaging
    ADD CONSTRAINT product_packaging_fraisdeport_pk PRIMARY KEY (fraisdeport);


--
-- Name: product product_pk; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);


--
-- Name: user user_pk; Type: CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pk PRIMARY KEY (id);


--
-- Name: fki_collection_fk; Type: INDEX; Schema: public; Owner: fanchovh
--

CREATE INDEX fki_collection_fk ON public.product USING btree ("collectionId");


--
-- Name: product_packaging_fraisdeport_uindex; Type: INDEX; Schema: public; Owner: fanchovh
--

CREATE UNIQUE INDEX product_packaging_fraisdeport_uindex ON public.product_packaging USING btree (fraisdeport);


--
-- Name: sessions_expired_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sessions_expired_index ON public.sessions USING btree (expired);


--
-- Name: product collection_fk; Type: FK CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT collection_fk FOREIGN KEY ("collectionId") REFERENCES public.collection(col_id);


--
-- Name: product product_product_colors_nbcolors_fk; Type: FK CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_product_colors_nbcolors_fk FOREIGN KEY ("nbColors") REFERENCES public.product_colors(nbcolors);


--
-- Name: product product_product_packaging_fraisdeport_fk; Type: FK CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_product_packaging_fraisdeport_fk FOREIGN KEY (packaging) REFERENCES public.product_packaging(fraisdeport);


--
-- Name: product product_product_performances_type_fk; Type: FK CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_product_performances_type_fk FOREIGN KEY (performance) REFERENCES public.product_performances(type);


--
-- Name: product_prof product_prof_product_performances_type_fk; Type: FK CONSTRAINT; Schema: public; Owner: fanchovh
--

ALTER TABLE ONLY public.product_prof
    ADD CONSTRAINT product_prof_product_performances_type_fk FOREIGN KEY (performance) REFERENCES public.product_performances(type);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO fanchovh;


--
-- PostgreSQL database dump complete
--


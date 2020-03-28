PGDMP     0    4                x         	   quadratik    9.6.17    12.2 (Debian 12.2-2.pgdg90+1) ]    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16587 	   quadratik    DATABASE     {   CREATE DATABASE quadratik WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'fr_FR.UTF-8' LC_CTYPE = 'fr_FR.UTF-8';
    DROP DATABASE quadratik;
                fanchovh    false            �           0    0    SCHEMA public    ACL     S   REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO fanchovh;
                   postgres    false    3            �            1259    16588    admin    TABLE     x   CREATE TABLE public.admin (
    id integer NOT NULL,
    "user" text,
    hashpwd text,
    userid character varying
);
    DROP TABLE public.admin;
       public            fanchovh    false            �            1259    16594    admin_id_seq    SEQUENCE     u   CREATE SEQUENCE public.admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.admin_id_seq;
       public          fanchovh    false    189            �           0    0    admin_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;
          public          fanchovh    false    190            �            1259    33369    boxtal    TABLE       CREATE TABLE public.boxtal (
    userid character varying,
    collection_date date NOT NULL,
    prix_boxtal numeric NOT NULL,
    livraison_date date NOT NULL,
    service character varying NOT NULL,
    date_commande numeric,
    reference character varying
);
    DROP TABLE public.boxtal;
       public            fanchovh    false            �            1259    16596    cart    TABLE     �  CREATE TABLE public.cart (
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
    DROP TABLE public.cart;
       public            fanchovh    false            �            1259    16602    cart_id_seq    SEQUENCE     t   CREATE SEQUENCE public.cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.cart_id_seq;
       public          fanchovh    false    191            �           0    0    cart_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;
          public          fanchovh    false    192            �            1259    16606 
   collection    TABLE     �   CREATE TABLE public.collection (
    col_id integer NOT NULL,
    name text NOT NULL,
    desc_collection text NOT NULL,
    folder text
);
    DROP TABLE public.collection;
       public            fanchovh    false            �            1259    16612    collection_id_seq    SEQUENCE     z   CREATE SEQUENCE public.collection_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.collection_id_seq;
       public          fanchovh    false    193            �           0    0    collection_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.collection_id_seq OWNED BY public.collection.col_id;
          public          fanchovh    false    194            �            1259    16614    commande    TABLE     -  CREATE TABLE public.commande (
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
    DROP TABLE public.commande;
       public            fanchovh    false            �            1259    16620    commande_id_seq    SEQUENCE     x   CREATE SEQUENCE public.commande_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.commande_id_seq;
       public          fanchovh    false    195            �           0    0    commande_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.commande_id_seq OWNED BY public.commande.id;
          public          fanchovh    false    196            �            1259    33420    devis    TABLE     �  CREATE TABLE public.devis (
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
    acompte integer,
    logo boolean,
    id integer NOT NULL
);
    DROP TABLE public.devis;
       public            fanchovh    false            �            1259    33443    devis_id_seq    SEQUENCE     u   CREATE SEQUENCE public.devis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.devis_id_seq;
       public          fanchovh    false    212            �           0    0    devis_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.devis_id_seq OWNED BY public.devis.id;
          public          fanchovh    false    213            �            1259    16622    informations    TABLE     �  CREATE TABLE public.informations (
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
     DROP TABLE public.informations;
       public            fanchovh    false            �            1259    16628 	   livraison    TABLE     !  CREATE TABLE public.livraison (
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
    DROP TABLE public.livraison;
       public            fanchovh    false            �            1259    16634    livraison_id_seq    SEQUENCE     y   CREATE SEQUENCE public.livraison_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.livraison_id_seq;
       public          fanchovh    false    198            �           0    0    livraison_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.livraison_id_seq OWNED BY public.livraison.id;
          public          fanchovh    false    199            �            1259    33396    news    TABLE     t   CREATE TABLE public.news (
    id integer NOT NULL,
    page text NOT NULL,
    titre text,
    description text
);
    DROP TABLE public.news;
       public            fanchovh    false            �            1259    16636    product    TABLE       CREATE TABLE public.product (
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
    DROP TABLE public.product;
       public            fanchovh    false            �            1259    16642    product_colors    TABLE     �   CREATE TABLE public.product_colors (
    nbcolors integer NOT NULL,
    prixcolors double precision,
    prixcolorsclient numeric
);
 "   DROP TABLE public.product_colors;
       public            fanchovh    false            �            1259    16654    product_id_seq    SEQUENCE     w   CREATE SEQUENCE public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.product_id_seq;
       public          fanchovh    false    200            �           0    0    product_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;
          public          fanchovh    false    202            �            1259    16662    product_packaging    TABLE     �   CREATE TABLE public.product_packaging (
    fraisdeport numeric NOT NULL,
    carton numeric,
    papierbulle numeric,
    dimensions character varying,
    prix_carton numeric
);
 %   DROP TABLE public.product_packaging;
       public            fanchovh    false            �            1259    16668    product_performances    TABLE     �  CREATE TABLE public.product_performances (
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
 (   DROP TABLE public.product_performances;
       public            fanchovh    false            �            1259    16674    product_prof    TABLE     k   CREATE TABLE public.product_prof (
    profondeur integer,
    surface numeric,
    performance integer
);
     DROP TABLE public.product_prof;
       public            fanchovh    false            �            1259    16792    promo    TABLE     D   CREATE TABLE public.promo (
    code text,
    reduction numeric
);
    DROP TABLE public.promo;
       public            fanchovh    false            �            1259    16686    sessions    TABLE     �   CREATE TABLE public.sessions (
    sid character varying(255) NOT NULL,
    sess json NOT NULL,
    expired timestamp with time zone NOT NULL
);
    DROP TABLE public.sessions;
       public            postgres    false            �            1259    16692    user    TABLE     �   CREATE TABLE public."user" (
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
    DROP TABLE public."user";
       public            fanchovh    false            �            1259    16698    user_id_seq    SEQUENCE     t   CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          fanchovh    false    207             	           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          fanchovh    false    208            8           2604    16700    admin id    DEFAULT     d   ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);
 7   ALTER TABLE public.admin ALTER COLUMN id DROP DEFAULT;
       public          fanchovh    false    190    189            9           2604    16701    cart id    DEFAULT     b   ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);
 6   ALTER TABLE public.cart ALTER COLUMN id DROP DEFAULT;
       public          fanchovh    false    192    191            :           2604    16703    collection col_id    DEFAULT     r   ALTER TABLE ONLY public.collection ALTER COLUMN col_id SET DEFAULT nextval('public.collection_id_seq'::regclass);
 @   ALTER TABLE public.collection ALTER COLUMN col_id DROP DEFAULT;
       public          fanchovh    false    194    193            ;           2604    16704    commande id    DEFAULT     j   ALTER TABLE ONLY public.commande ALTER COLUMN id SET DEFAULT nextval('public.commande_id_seq'::regclass);
 :   ALTER TABLE public.commande ALTER COLUMN id DROP DEFAULT;
       public          fanchovh    false    196    195            ?           2604    33445    devis id    DEFAULT     d   ALTER TABLE ONLY public.devis ALTER COLUMN id SET DEFAULT nextval('public.devis_id_seq'::regclass);
 7   ALTER TABLE public.devis ALTER COLUMN id DROP DEFAULT;
       public          fanchovh    false    213    212            <           2604    16705    livraison id    DEFAULT     l   ALTER TABLE ONLY public.livraison ALTER COLUMN id SET DEFAULT nextval('public.livraison_id_seq'::regclass);
 ;   ALTER TABLE public.livraison ALTER COLUMN id DROP DEFAULT;
       public          fanchovh    false    199    198            =           2604    16706 
   product id    DEFAULT     h   ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);
 9   ALTER TABLE public.product ALTER COLUMN id DROP DEFAULT;
       public          fanchovh    false    202    200            >           2604    16707    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          fanchovh    false    208    207            �          0    16588    admin 
   TABLE DATA           <   COPY public.admin (id, "user", hashpwd, userid) FROM stdin;
    public          fanchovh    false    189   n       �          0    33369    boxtal 
   TABLE DATA           y   COPY public.boxtal (userid, collection_date, prix_boxtal, livraison_date, service, date_commande, reference) FROM stdin;
    public          fanchovh    false    210   �n       �          0    16596    cart 
   TABLE DATA           �   COPY public.cart (id, pid, userid, quantite, reduction, sous_total, montanttotal, fdp, prix, hauteur, poids, unites, quantite_totale, nom, nbcolis, montanthorsfdp, cartid) FROM stdin;
    public          fanchovh    false    191   Lo       �          0    16606 
   collection 
   TABLE DATA           K   COPY public.collection (col_id, name, desc_collection, folder) FROM stdin;
    public          fanchovh    false    193   �q       �          0    16614    commande 
   TABLE DATA           �   COPY public.commande (id, mode, amount, expirationdate, transactionid, status, userid, date, method, profileid, orderid) FROM stdin;
    public          fanchovh    false    195   �t       �          0    33420    devis 
   TABLE DATA           �   COPY public.devis (entreprise, code_postal, mail, adresse, pays, siret, telephone, ville, titulaire, iban, bic, date_devis, date_val, numero, moyen_paiement, userid, acompte, logo, id) FROM stdin;
    public          fanchovh    false    212   Ov       �          0    16622    informations 
   TABLE DATA           �   COPY public.informations (nomentreprise, adresse, siret, sirene, ape, codepostal, ville, pays, mail, telephone, iban, bic, titulaire, logo) FROM stdin;
    public          fanchovh    false    197   �z       �          0    16628 	   livraison 
   TABLE DATA           �   COPY public.livraison (id, livr_mode, livr_nom, livr_adresse, livr_ville, livr_postal, userid, livr_service, operateur, livr_pays) FROM stdin;
    public          fanchovh    false    198   �{       �          0    33396    news 
   TABLE DATA           <   COPY public.news (id, page, titre, description) FROM stdin;
    public          fanchovh    false    211   �|       �          0    16636    product 
   TABLE DATA           }   COPY public.product (id, nom, prix, "nbColors", "collectionId", performance, packaging, src, filter, top, stock) FROM stdin;
    public          fanchovh    false    200   %}       �          0    16642    product_colors 
   TABLE DATA           P   COPY public.product_colors (nbcolors, prixcolors, prixcolorsclient) FROM stdin;
    public          fanchovh    false    201   �       �          0    16662    product_packaging 
   TABLE DATA           f   COPY public.product_packaging (fraisdeport, carton, papierbulle, dimensions, prix_carton) FROM stdin;
    public          fanchovh    false    203   �       �          0    16668    product_performances 
   TABLE DATA           �   COPY public.product_performances (type, frequence, classement, graph, desc_product, prof, surface, taillecellule, longueur, largeur, nbpieces, nbcarreaux, nbcellules, unite, poids) FROM stdin;
    public          fanchovh    false    204   J�       �          0    16674    product_prof 
   TABLE DATA           H   COPY public.product_prof (profondeur, surface, performance) FROM stdin;
    public          fanchovh    false    205   ��       �          0    16792    promo 
   TABLE DATA           0   COPY public.promo (code, reduction) FROM stdin;
    public          fanchovh    false    209   ̂       �          0    16686    sessions 
   TABLE DATA           6   COPY public.sessions (sid, sess, expired) FROM stdin;
    public          postgres    false    206   ��       �          0    16692    user 
   TABLE DATA           r   COPY public."user" (id, userid, nom, prenom, adresse, postal, mail, telephone, contexte, ville, pays) FROM stdin;
    public          fanchovh    false    207   �       	           0    0    admin_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.admin_id_seq', 6, true);
          public          fanchovh    false    190            	           0    0    cart_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.cart_id_seq', 789, true);
          public          fanchovh    false    192            	           0    0    collection_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.collection_id_seq', 1, false);
          public          fanchovh    false    194            	           0    0    commande_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.commande_id_seq', 170, true);
          public          fanchovh    false    196            	           0    0    devis_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.devis_id_seq', 58, true);
          public          fanchovh    false    213            	           0    0    livraison_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.livraison_id_seq', 249, true);
          public          fanchovh    false    199            	           0    0    product_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.product_id_seq', 1, false);
          public          fanchovh    false    202            	           0    0    user_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.user_id_seq', 515, true);
          public          fanchovh    false    208            A           2606    16709    admin admin_pk 
   CONSTRAINT     L   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pk;
       public            fanchovh    false    189            C           2606    16711    cart cart_pk 
   CONSTRAINT     J   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pk PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pk;
       public            fanchovh    false    191            E           2606    16713    collection collection_pk 
   CONSTRAINT     Z   ALTER TABLE ONLY public.collection
    ADD CONSTRAINT collection_pk PRIMARY KEY (col_id);
 B   ALTER TABLE ONLY public.collection DROP CONSTRAINT collection_pk;
       public            fanchovh    false    193            G           2606    16715    commande commande_pk 
   CONSTRAINT     R   ALTER TABLE ONLY public.commande
    ADD CONSTRAINT commande_pk PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.commande DROP CONSTRAINT commande_pk;
       public            fanchovh    false    195            ^           2606    33447    devis devis_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.devis
    ADD CONSTRAINT devis_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.devis DROP CONSTRAINT devis_pkey;
       public            fanchovh    false    212            K           2606    16717    livraison livraison_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.livraison
    ADD CONSTRAINT livraison_pk PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.livraison DROP CONSTRAINT livraison_pk;
       public            fanchovh    false    198            U           2606    16719 #   product_performances modele_type_pk 
   CONSTRAINT     c   ALTER TABLE ONLY public.product_performances
    ADD CONSTRAINT modele_type_pk PRIMARY KEY (type);
 M   ALTER TABLE ONLY public.product_performances DROP CONSTRAINT modele_type_pk;
       public            fanchovh    false    204            I           2606    33204    informations name 
   CONSTRAINT     Z   ALTER TABLE ONLY public.informations
    ADD CONSTRAINT name PRIMARY KEY (nomentreprise);
 ;   ALTER TABLE ONLY public.informations DROP CONSTRAINT name;
       public            fanchovh    false    197            \           2606    33403    news news_pk 
   CONSTRAINT     J   ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pk PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.news DROP CONSTRAINT news_pk;
       public            fanchovh    false    211            P           2606    16721 )   product_colors product_colors_nbcolors_pk 
   CONSTRAINT     m   ALTER TABLE ONLY public.product_colors
    ADD CONSTRAINT product_colors_nbcolors_pk PRIMARY KEY (nbcolors);
 S   ALTER TABLE ONLY public.product_colors DROP CONSTRAINT product_colors_nbcolors_pk;
       public            fanchovh    false    201            R           2606    16725 2   product_packaging product_packaging_fraisdeport_pk 
   CONSTRAINT     y   ALTER TABLE ONLY public.product_packaging
    ADD CONSTRAINT product_packaging_fraisdeport_pk PRIMARY KEY (fraisdeport);
 \   ALTER TABLE ONLY public.product_packaging DROP CONSTRAINT product_packaging_fraisdeport_pk;
       public            fanchovh    false    203            N           2606    16727    product product_pk 
   CONSTRAINT     P   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pk PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pk;
       public            fanchovh    false    200            X           2606    16729    sessions sessions_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public            postgres    false    206            Z           2606    16731    user user_pk 
   CONSTRAINT     L   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pk;
       public            fanchovh    false    207            L           1259    16732    fki_collection_fk    INDEX     O   CREATE INDEX fki_collection_fk ON public.product USING btree ("collectionId");
 %   DROP INDEX public.fki_collection_fk;
       public            fanchovh    false    200            S           1259    16734 $   product_packaging_fraisdeport_uindex    INDEX     p   CREATE UNIQUE INDEX product_packaging_fraisdeport_uindex ON public.product_packaging USING btree (fraisdeport);
 8   DROP INDEX public.product_packaging_fraisdeport_uindex;
       public            fanchovh    false    203            V           1259    16735    sessions_expired_index    INDEX     N   CREATE INDEX sessions_expired_index ON public.sessions USING btree (expired);
 *   DROP INDEX public.sessions_expired_index;
       public            postgres    false    206            _           2606    16746    product collection_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT collection_fk FOREIGN KEY ("collectionId") REFERENCES public.collection(col_id);
 ?   ALTER TABLE ONLY public.product DROP CONSTRAINT collection_fk;
       public          fanchovh    false    2117    193    200            `           2606    16761 *   product product_product_colors_nbcolors_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_product_colors_nbcolors_fk FOREIGN KEY ("nbColors") REFERENCES public.product_colors(nbcolors);
 T   ALTER TABLE ONLY public.product DROP CONSTRAINT product_product_colors_nbcolors_fk;
       public          fanchovh    false    201    2128    200            a           2606    16771 0   product product_product_packaging_fraisdeport_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_product_packaging_fraisdeport_fk FOREIGN KEY (packaging) REFERENCES public.product_packaging(fraisdeport);
 Z   ALTER TABLE ONLY public.product DROP CONSTRAINT product_product_packaging_fraisdeport_fk;
       public          fanchovh    false    203    200    2130            b           2606    16776 ,   product product_product_performances_type_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_product_performances_type_fk FOREIGN KEY (performance) REFERENCES public.product_performances(type);
 V   ALTER TABLE ONLY public.product DROP CONSTRAINT product_product_performances_type_fk;
       public          fanchovh    false    204    2133    200            c           2606    16781 6   product_prof product_prof_product_performances_type_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_prof
    ADD CONSTRAINT product_prof_product_performances_type_fk FOREIGN KEY (performance) REFERENCES public.product_performances(type);
 `   ALTER TABLE ONLY public.product_prof DROP CONSTRAINT product_prof_product_performances_type_fk;
       public          fanchovh    false    2133    204    205            �   �   x�Eɻ�0 @ѹ�VIU�M4b,��и@�(����Fr�s��)��:��A0�p�7���3�mpEL���c��.���)W�롊s!Ӻ�!��H�uj^��H�_�v���F���Ћ��z62���Qԡ+J�
�̻e5�P@FϘ��y��շv��2��s�<�      �   p   x�+׭��	ȉ,3�.r/O*���,)p���v�420��54�52�4�3�D��9�Rs3���s2�9M�M���,-,8-L�,,L���LB݂�b���� !)       �   ,  x���ێ�0�������aƇK@�¶��,�R�a�I	�n��%�.
H]9N���~{��#�f��k�MY�}�!�f����!~�No�K�gR3����Lp��z:��q�<�q����F�%�rV��Q�,WEx�Ń��%���� 2�Y�(\�b��{�^6\<�/uK�����Y��?)g�-�J2��(nF��,�>9+C�հ��,�Dwz�r:o�;z]~������'&���i�LӋ�d�(���9��w> �pd����H F�^�g	��F��X��_�Of���k�s�.�EҞ�CNs�q\��p�$0/��i���	�\sВ�m[�s�����z��fۨ'��5�H��(&3��)9	�S����ar3����j�P�3"Vs��%��.�U$t�wϣ�?����}�Ŀ���)�j+s����r(��d�\����?xB�ˎ���򫅦e�2�jqP��\ط�z@J6'kϷ����Q�A�=c6�5ȓ�G$8�w'#�>�}�ͷ���ܩ�t�k�ȼ�2{������!���wA�����      �   \  x�uTMo�F=��b|� 1a%����&A$AE/��ȡ41�������h�o���͒�$�>�vw�y�f�Ň΄ ��GC��:��8Ku>�����7LSm���x�V>Ej���I��s��ĸq�L��R�a_�0�ş~m�\_�x�9��F 4���M���u�ǩ����3"Iץ���A��y��5���)S��ʾE(��i|���!�F �Z�#��>��I������L@\��hꌔOfv��rxN��$TQ�+._����>�����PH�8��@kZ�ap�L5Njd�}A��VW��~��j�I����
R�6W`���2���߫��-p�
@�SN���H8S1ZB���|U|+=�{X��9qPĕD�����sY�y�����
��qP�:h��q�&!#=��~�vƮٓ�u����P�������
W{��y���?��2y�	ڴP�m}��Q���M��Nt#͸u��a��8�����|�7���`�~-�D5��>������i*	S�e��E�NM��5�_���'��Аo�%��Sc��گqh5���q� k��t(�f9��!��qͪ:��In�;ܥ!�$��o����bG����(^o0��Y��S<�?9��8x�JTms�4��_=�r����{���#8�o⹚{��к9�}z����<+-~_�W�oKf���m�6 �x�"�g� �`��dX.ϊ�!n8��?���^^�w�x���k������K�����M�T�'��ו��ঙ����\�,�a��n�
��a��w$��r������������Î[u��ut�E����(Ʋ��M7=�\��ޟ��|U�e�ʓ�      �   K  x���[o�@���_�{��]����j��ceQaY�_QҘ��ɼ̙���b&��r�	����Kc'��H�D#�D��h�"�/Nk+g��x,��.�W�wf� jB!3bt��V���E�XC�H��<�o��\},�m��A^^'��D�:����RM�Y�bH�K�޺C1İ	�&b.�mHۄ�AؾOd���"���y	��� �n9IǸ�O���f�Hz�¡J,�s3�!��D��.@&��F2�?��e�*�Q5t��}Ã�� Ӷyn��,q�4v-�b~Afɸ������&���������zBm��4�aՄ�      �   l  x����n�F����u���g�U���8:2`��l��y�>G_�\��&R3�~�@�%d�?y����	�i����Ԡ�1d�Y�����׏�l"s�[���˿�4�4\�"CQN,yx!�03���"�)lxQ�\����S1���ݹ��R��*dJ���0%��"���Aad8N���f�n��q��afb�;f�n zK�-As��N�F/�23�ݷs��i�Ϊ�Z�0i��v�&��ތ���ߴ��hDމG�8�JE����[��N�o��q��ӻe;mf��+�]�(�Q�5�(�õN�I0gL�i	y��hY��t�	gD��~�{^�Q�m������.L��8L	�I1�`*�L�8%N���*�Z�ҁBm!m(���b:_El�B����9/�J�I�Y����w׽�ޅ� /�A�k���j	e	'�$�uBm"]'�(�u��"$�<
��>pk��zoQ��r�ͷ��-��h�����{�(�[:N�M���D�h9���j�:���ja���j1%��O�A$��:N�AdQ�3?)��L�6��4��C2ک�@q���U3��(������C[J�@�R�@��.l�B�6�.l1�N�hVŅԗ������&y�B٣��F��
����P��P�8�f�H�ɠf�JZ:P�]�0R:P�]D�i�畵�M㾟3��}j��5.?ڥ�}^�^�P��"��!�/�5.aOt�,�5o�v�1n}���l!��jY�c'�*Ny>�켶��H}<qF�ɓ�}���E.���־X�:aD�g���Ɉ�F}fZǃ�Yd��i��d|"è�/F����L�d�*:H9�>�b.�����u�g��շrM=ٯj���j�O��V?Za$�O�[L�zz�0*�I�#�ݺ�o��oN.�a��a��+}J�� (d��l�J�ê.{6~޳�k�����5Z�d?k,;����?�e���02�R	�����@)��#�de�_v��P�Xr�vE�͞ڻ��t��`�
�Bg��u�Te��
���-��b|�`�0�.9/�v7�~q-�>����"sz�}�[m�*�l��J��W����#Ξ:���`��Vֻ��$"l���gv����?nnn��g	      �   �   x�M�K
�0Eǯ�x3g���'�Y��A-�"H��k��uO�Í��(.����N���?9`X��=l�= x��"b�/��A��!�2�@9���ʹָ����b�� 	U%12.��~F��[�H9/UU�EV��B�r�2�,�|!aj/�1ô���}m\��7���<�H9�      �     x�U��n�@E׏��]Wm`:��:���@���(��@Ѷ����E��%w�n�=�P(����JA�d�|eji
p��*�d������J�<�����^�0��}�!�x�/k�oڏ�P��n75��+�1�8L�cl;��	1�B��e�e(�s��T�4g�!�$���7�.��\\����[%G�>����k�&�k~�_*HU%u�����s�1�'��2F�Q�o	��T��f���)��߀��	���P�Ɲ�2ZVϴ-3?�G��,+^6�������o��c�      �   Y   x�3�,��/�(���/������/-K��IU(�	)$�f���g�f*(rqf��r�����:���r��&f+䗂����b��=... ��      �   �  x����r�0���S�l� � /��:i�K:�Mf:��1 "���ԾF^�G$�;LW�?��GG7��'��\ƐP�BL�2���ռU^&K�~���T��m��=m_U�s� >
���K��b��ҽ�khf��i&���p^ڡ����6���R8���+����m¥s�NT�魮�[�&��'�����<^�GR��H�6?����iwIIG�r�7�����Ģ��~6�J�\l�S���8 �wc��t�j��*���7_���׷���ʜb��s@�;������t"��.p]�f�6t��c��ن�5�͔�&+V�֙2ل����A�ds��>j>���s��pЦ\݊'�;.X��%	Լ��?̥\�C���zn@��W>�𤳻���EA���M� �;)X9	�S1|mY��}!�"��`Fx7�Y��Jq�����ϟK&|��l'J�����dnw���ƾ��f��p5��B
�!���a�7�OH��SYq�r��Bz��|[7j�٪�����=���t��&���G��K��Z{oVޡЍ�EZr�vA���k

����dZ�;�/2�&^>d��UǮ;ַ��Q��jF�c�v?���7M�ފ�bYg��0��-��+��      �   +   x��A 0��Lզ�60�cvӴ�)�ȸ�ղu�X�$}e47      �   6   x�3�4�4�3�45� !N3=#3.c�����V�F&X�-�
`����� D�      �   9  x�͕�r�0���S,'.�ǒ-�y`���A�7ES[2��gjށ�_����Li	�2�D�h�����%q&�<9}�dW<�H
HJH�/��N#_���j���0�Ǡ�Iy}���`;��oMK�a�w:Ѓ���wt���!�v�h�0�i���ݳ�vy�
~��No��ѻhJOWp���_�1��<Q��(UgbUq��Z��SY�Vh��P��v�m��2��:�h4nL G��i�`�����`�:(��xk����KVT�Z �;�*��ۉ{�Z�����)�S�S�-^�� ���ǝ%sa��m�"�rɪb��5����Es��`WD�������B`\b�bAs��Z�gߋ��N�5];Qq��΃���a�T&*�0]��^S�)��aJ��6�W�D��yJ�m�(�jo�������]UO�5�u�DY�9T�^1Nh:�/E�\�U�!�VQ�eUT��uS��l�3��ޗk8��8x���j�����o-%��=��E掖�%r��aC���?�C�M�1�Iv��������O��$�s�Z�~ ��      �   )   x�34�4г�47�24�4�3�47�22 �L8͍�b���� _c      �      x�su��7�4�r�t324�4����� ;�F      �      x������ � �      �   V  x����n�P���S��Ƌ,;��h�j�"Ĥ��^��G��9�b�h۴M��b2����2g��
u7.L^�������&�B�6)�^�A���$ �b5i�W^��Q��]�Г
��:��^���|��$��o�&��8+����p�A���i�R�g�H*���PD�Ƴ�4�S��`�: �L&��cq	� �H@�Q��o(%g!��=��.\��Ȯ7�R��=�ib��X��f?�G3vy\����������U���p�fd��|L	��'���1�m�e��y,�������?S��C ��'�-cr�]l��A��� �-��E !���~��]�9�{�F��     
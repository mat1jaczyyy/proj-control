CREATE TABLE Uloga
(
  idUloge INT NOT NULL,
  nazivUloge VARCHAR(30) NOT NULL,
  PRIMARY KEY (idUloge)
);

CREATE TABLE VrstaZadatka
(
  idVrste INT NOT NULL,
  nazivVrste VARCHAR(30) NOT NULL,
  PRIMARY KEY (idVrste)
);

CREATE TABLE Status
(
  idStatusa INT NOT NULL,
  nazivStatusa VARCHAR(30) NOT NULL,
  PRIMARY KEY (idStatusa)
);

CREATE TABLE PrioritetZadatka
(
  idPrioriteta INT NOT NULL,
  nazivPrioriteta VARCHAR(30),
  PRIMARY KEY (idPrioriteta)
);

CREATE TABLE Projekt
(
  idProjekta INT NOT NULL,
  nazivProjekta VARCHAR(30) NOT NULL,
  planDatPoc DATE,
  planDatKraj DATE,
  datPoc DATE NOT NULL,
  datKraj DATE NOT NULL,
  idStatusa INT NOT NULL,
  PRIMARY KEY (idProjekta),
  FOREIGN KEY (idStatusa) REFERENCES Status(idStatusa)
);

CREATE TABLE Zaposlenik
(
  idZaposlenika INT NOT NULL,
  korisnickoIme VARCHAR(30) NOT NULL,
  lozinka VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL,
  imeZaposlenika VARCHAR(30) NOT NULL,
  prezimeZaposlenika VARCHAR(30) NOT NULL,
  idUloge INT NOT NULL,
  PRIMARY KEY (idZaposlenika),
  FOREIGN KEY (idUloge) REFERENCES Uloga(idUloge),
  UNIQUE (korisnickoIme)
);

CREATE TABLE GrupaZadataka
(
  idGrupe INT NOT NULL,
  nazivGrupe VARCHAR(20) NOT NULL,
  opis VARCHAR(100),
  prioritet INT NOT NULL,
  planBudzet FLOAT,
  budzet FLOAT NOT NULL,
  idProjekta INT NOT NULL,
  PRIMARY KEY (idGrupe),
  FOREIGN KEY (idProjekta) REFERENCES Projekt(idProjekta)
);

CREATE TABLE RadniList
(
  idRadnogLista INT NOT NULL,
  vrijemeRada INT NOT NULL,
  idZaposlenika INT NOT NULL,
  PRIMARY KEY (idRadnogLista),
  FOREIGN KEY (idZaposlenika) REFERENCES Zaposlenik(idZaposlenika)
);

CREATE TABLE radiNa
(
  idProjekta INT NOT NULL,
  idZaposlenika INT NOT NULL,
  PRIMARY KEY (idProjekta, idZaposlenika),
  FOREIGN KEY (idProjekta) REFERENCES Projekt(idProjekta),
  FOREIGN KEY (idZaposlenika) REFERENCES Zaposlenik(idZaposlenika)
);

CREATE TABLE Zadatak
(
  idZadatka INT NOT NULL,
  opis VARCHAR(100) NOT NULL,
  planDatPoc DATE,
  planDatKraj DATE,
  planBudzet FLOAT,
  budzet FLOAT NOT NULL,
  datPoc DATE NOT NULL,
  datKraj DATE NOT NULL,
  planBrSati INT,
  idGrupe INT NOT NULL,
  idVrste INT NOT NULL,
  idStatusa INT NOT NULL,
  idPrioriteta INT NOT NULL,
  idRadnogLista INT NOT NULL,
  PRIMARY KEY (idZadatka),
  FOREIGN KEY (idGrupe) REFERENCES GrupaZadataka(idGrupe),
  FOREIGN KEY (idVrste) REFERENCES VrstaZadatka(idVrste),
  FOREIGN KEY (idStatusa) REFERENCES Status(idStatusa),
  FOREIGN KEY (idPrioriteta) REFERENCES PrioritetZadatka(idPrioriteta),
  FOREIGN KEY (idRadnogLista) REFERENCES RadniList(idRadnogLista)
);

CREATE TABLE dodijeljenJe
(
  idZaposlenika INT NOT NULL,
  idZadatka INT NOT NULL,
  PRIMARY KEY (idZaposlenika, idZadatka),
  FOREIGN KEY (idZaposlenika) REFERENCES Zaposlenik(idZaposlenika),
  FOREIGN KEY (idZadatka) REFERENCES Zadatak(idZadatka)
);
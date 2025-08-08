# Dokument wymagań produktu (PRD) - MyStoreAssistant

## 1. Przegląd produktu

MyStoreAssistant to aplikacja webowa w wersji MVP (Minimum Viable Product) stworzona z myślą o właścicielach małych, stacjonarnych sklepów, którzy prowadzą również sprzedaż online. Jej głównym celem jest rozwiązanie problemu braku synchronizacji danych między kanałami sprzedaży. Aplikacja ma działać jako centralny punkt zarządzania sprzedażą stacjonarną, zapewniając użytkownikowi natychmiastowy dostęp do aktualnych stanów magazynowych i cen. Umożliwia szybkie tworzenie zamówień przy ladzie, zarządzanie produktami oraz prowadzenie prostej bazy klientów, stając się jedynym i ostatecznym źródłem prawdy dla operacji w sklepie stacjonarnym. Produkt został zaprojektowany z myślą o responsywności, by zapewnić komfortowe użytkowanie na komputerach stacjonarnych, laptopach i telefonach komórkowych.

## 2. Problem użytkownika

Użytkowniczka docelowa, Anna, jest właścicielką butiku. Jej codzienna praca jest utrudniona przez serię powiązanych ze sobą problemów operacyjnych, które wynikają z prowadzenia sprzedaży w dwóch odrębnych systemach (online i offline).

Główne problemy Anny to:

- Niepewność co do faktycznej dostępności produktu podczas obsługi klienta, spowodowana opóźnieniami w synchronizacji stanów magazynowych między sklepem online a stanem fizycznym.
- Brak jednego, wiarygodnego źródła informacji o aktualnych cenach produktów.
- Brak dedykowanego, szybkiego narzędzia do rejestrowania sprzedaży stacjonarnej, co prowadzi do ręcznego notowania i późniejszego wprowadzania danych, generując ryzyko pomyłek.
- Rozproszone i niespójne dane o produktach, co komplikuje zarządzanie ofertą.

MyStoreAssistant ma na celu wyeliminowanie tych problemów poprzez dostarczenie jednego, prostego w obsłudze narzędzia, które stanie się centrum zarządzania sprzedażą stacjonarną.

## 3. Wymagania funkcjonalne

### 3.1. Uwierzytelnianie

- System nie posiada publicznej rejestracji. Konto dla jedynego użytkownika (właściciela) jest tworzone za pomocą skryptu inicjalizującego.
- Dostęp do aplikacji jest chroniony formularzem logowania (e-mail i hasło).
- Poprawne logowanie skutkuje wygenerowaniem bezpiecznego tokenu sesji (JWT).

### 3.2. Zarządzanie produktami i katalogiem

- Przy pierwszym uruchomieniu aplikacja jednorazowo pobiera dane o produktach z zewnętrznego API (FakeStoreAPI) i zapisuje je w lokalnej bazie danych, która od tego momentu jest jedynym źródłem prawdy.
- Użytkownik ma możliwość dodawania, edytowania i archiwizowania produktów. Trwałe usuwanie jest zablokowane w celu zachowania integralności danych historycznych.
- Formularz edycji produktu pozwala na bezpośrednią zmianę stanu magazynowego (`stock_quantity`).
- Główny widok katalogu pozwala na:
  - Łączenie filtrowania po kategoriach z wyszukiwaniem tekstowym po nazwie produktu.
  - Wyszukiwarka działa na zasadzie dopasowania częściowego ("zawiera").
  - Produkty z zerowym stanem magazynowym są widoczne w katalogu, ale mają wyłączoną możliwość dodania do koszyka.
  - Produkty zarchiwizowane nie są widoczne w widoku katalogu sprzedaży. Musi istnieć osobny widok/filtr umożliwiający zarządzanie produktami niedostępnymi i zarchiwizowanymi.

### 3.3. Zarządzanie klientami

- System zawiera prostą bazę klientów, gdzie numer telefonu jest unikalnym identyfikatorem.
- Podczas tworzenia zamówienia, użytkownik może wyszukać istniejącego klienta po numerze telefonu (dokładne dopasowanie).
- W przypadku znalezienia klienta, jego dane (imię, nazwisko) są automatycznie wstawiane do formularza.
- Jeśli użytkownik zmieni imię/nazwisko dla istniejącego numeru telefonu, dane klienta w bazie zostaną zaktualizowane.
- Jeśli wpisany numer telefonu nie istnieje w bazie, system tworzy nowego klienta po finalizacji zamówienia.

### 3.4. Proces sprzedaży

- Użytkownik może dodawać produkty z katalogu do koszyka i modyfikować ich ilość.
- Finalizacja zamówienia jest możliwa tylko po podaniu danych klienta (wyszukanie lub stworzenie nowego).
- Koszyk jest dynamicznie walidowany. Produkty, które w międzyczasie zostały zarchiwizowane lub ich stan magazynowy spadł do zera, są usuwane z koszyka, o czym użytkownik jest informowany.
- System przeprowadza walidację po stronie serwera, sprawdzając, czy zamawiana ilość każdego produktu nie przekracza jego stanu magazynowego.
- Pomyślne złożenie zamówienia skutkuje atomowym zmniejszeniem stanów magazynowych (`stock_quantity`) dla sprzedanych produktów i zapisaniem zamówienia w bazie.
- Po finalizacji, koszyk jest czyszczony, a aplikacja jest gotowa na przyjęcie kolejnego zamówienia.

### 3.5. Historia zamówień

- Dostępna jest chronologicznie posortowana lista wszystkich historycznych zamówień.
- Każde zamówienie na liście zawiera unikalny identyfikator, dane klienta, łączną kwotę oraz listę zakupionych produktów (nawet jeśli zostały one później zarchiwizowane).
- Użytkownik może wyszukać zamówienie w historii, wpisując w jedno pole numer telefonu lub imię/nazwisko klienta.

## 4. Granice projektu

Poniższe funkcjonalności są świadomie wykluczone z zakresu wersji MVP, aby skupić się na rozwiązaniu kluczowego problemu użytkownika:

- Zarządzanie zwrotami i reklamacjami.
- Programy lojalnościowe, karty podarunkowe i kody rabatowe.
- Integracja z terminalami płatniczymi. Płatność odbywa się poza systemem.
- Integracja z systemami księgowymi i fakturowaniem.
- Obsługa wielu kont użytkowników, ról i uprawnień. Aplikacja jest przeznaczona dla jednego użytkownika.
- Ciągła, dwukierunkowa synchronizacja ze sklepem online po jednorazowej inicjalizacji.
- Tworzenie historii zmian stanów magazynowych.

## 5. Historyjki użytkowników

### Uwierzytelnianie i dostęp

#### US-001: Logowanie do aplikacji

- Jako Anna, chcę móc bezpiecznie zalogować się do aplikacji przy użyciu mojego adresu e-mail i hasła, aby uzyskać dostęp do zarządzania sklepem.
- Kryteria akceptacji:
  - Na stronie logowania widoczny jest formularz z polami na e-mail i hasło.
  - Po wprowadzeniu poprawnych danych i kliknięciu "Zaloguj", zostaję przekierowana do głównego panelu aplikacji.
  - Po wprowadzeniu niepoprawnych danych, pod formularzem wyświetla się komunikat o błędzie, a ja pozostaję na stronie logowania.

### Zarządzanie katalogiem

#### US-002: Przeglądanie katalogu produktów

- Jako Anna, chcę widzieć listę wszystkich dostępnych produktów w moim sklepie, aby móc szybko zlokalizować interesujący mnie towar.
- Kryteria akceptacji:
  - Po zalogowaniu widzę listę produktów, które nie są zarchiwizowane.
  - Każdy produkt na liście ma widoczną nazwę, cenę, zdjęcie i dostępną ilość (`stock_quantity`).
  - Produkty z ilością równą 0 są widoczne na liście, ale mają wyraźne wizualne oznaczenie (np. są wyszarzone).
  - Przy każdym produkcie z ilością > 0 widoczny jest przycisk "Dodaj do koszyka".
  - Przy każdym produkcie z ilością = 0 przycisk "Dodaj do koszyka" jest niewidoczny lub nieaktywny.

#### US-003: Wyszukiwanie produktu po nazwie

- Jako Anna, chcę mieć możliwość wpisania fragmentu nazwy produktu w pole wyszukiwania, aby szybko odfiltrować listę i znaleźć konkretny przedmiot.
- Kryteria akceptacji:
  - Na stronie katalogu znajduje się pole wyszukiwania tekstowego.
  - W miarę wpisywania tekstu, lista produktów jest dynamicznie filtrowana, pokazując tylko te, których nazwa zawiera wpisaną frazę.
  - Wyszukiwanie nie rozróżnia wielkości liter i przeszukuje tylko produkty niezarchiwizowane.
  - Wyczyszczenie pola wyszukiwania przywraca pełną listę produktów (zgodnie z innymi filtrami).

#### US-004: Filtrowanie produktów po kategorii

- Jako Anna, chcę móc wybrać kategorię z listy, aby zobaczyć tylko produkty należące do tej kategorii.
- Kryteria akceptacji:
  - Na stronie katalogu znajduje się lista rozwijana lub zestaw przycisków z dostępnymi kategoriami.
  - Po wybraniu kategorii, lista produktów zostaje odfiltrowana i pokazuje tylko te z wybranej kategorii, które nie są zarchiwizowane.
  - Możliwe jest łączenie filtrowania po kategorii z wyszukiwaniem po nazwie.

### Zarządzanie produktami (CRUD)

#### US-005: Dodawanie nowego produktu

- Jako Anna, chcę mieć możliwość dodania nowego produktu do mojej bazy, podając jego nazwę, cenę, kategorię, opis oraz początkowy stan magazynowy.
- Kryteria akceptacji:
  - W panelu zarządzania produktami istnieje przycisk "Dodaj nowy produkt".
  - Po kliknięciu pojawia się formularz z polami: nazwa, cena, kategoria, opis, `stock_quantity`.
  - Wprowadzenie danych i zapisanie formularza powoduje dodanie nowego produktu do bazy danych ze statusem "aktywny".
  - Nowy produkt jest widoczny w katalogu.

#### US-006: Edycja istniejącego produktu

- Jako Anna, chcę mieć możliwość edycji danych istniejącego produktu, w szczególności jego stanu magazynowego, aby odzwierciedlić nową dostawę.
- Kryteria akceptacji:
  - W panelu zarządzania produktami przy każdym produkcie znajduje się przycisk "Edytuj".
  - Po kliknięciu otwiera się formularz z wypełnionymi aktualnymi danymi produktu.
  - Mogę zmienić dowolne pole, w tym `stock_quantity`.
  - Zapisanie formularza aktualizuje dane produktu w bazie danych.
  - System nie pozwala na zapisanie ujemnej wartości dla `stock_quantity`.

#### US-007: Zarządzanie produktami ukrytymi (niedostępnymi lub zarchiwizowanymi)

- Jako Anna, chcę mieć specjalny widok lub filtr, który pozwoli mi zobaczyć produkty niedostępne lub zarchiwizowane, aby móc nimi zarządzać.
- Kryteria akceptacji:
  - W panelu zarządzania produktami istnieje opcja (np. filtr "Status"), która pozwala wyświetlić produkty z `stock_quantity` równym 0 lub ze statusem "zarchiwizowany".
  - tym widoku mogę edytować produkt, np. aby uzupełnić jego stan magazynowy.
  - tym widoku mogę przywrócić zarchiwizowany produkt, zmieniając jego status z powrotem na "aktywny".

### Proces sprzedaży i koszyk

#### US-008: Dodawanie produktu do koszyka

- Jako Anna, chcę móc dodać produkt z katalogu do bieżącego zamówienia (koszyka), klikając odpowiedni przycisk.
- Kryteria akceptacji:
  - Kliknięcie przycisku "Dodaj do koszyka" przy produkcie powoduje dodanie jednej sztuki tego produktu do koszyka.
  - Koszyk jest stale widoczny na ekranie i aktualizuje swoją zawartość.
  - Jeśli ten sam produkt jest dodawany ponownie, jego ilość w koszyku wzrasta o 1.
  - W koszyku widoczna jest łączna kwota zamówienia.

#### US-009: Zarządzanie ilością w koszyku

- Jako Anna, chcę móc zmienić ilość sztuk danego produktu bezpośrednio w koszyku.
- Kryteria akceptacji:
  - Przy każdej pozycji w koszyku widoczne jest pole do edycji ilości.
  - Zmiana ilości powoduje natychmiastową aktualizację ceny dla tej pozycji oraz łącznej kwoty zamówienia.
  - Ustawienie ilości na 0 usuwa produkt z koszyka.
  - Nie można ustawić ilości większej niż dostępny `stock_quantity` dla danego produktu.

### Finalizacja zamówienia i klienci

#### US-010: Identyfikacja klienta przy finalizacji zamówienia

- Jako Anna, przechodząc do finalizacji zamówienia, chcę móc wyszukać klienta po numerze telefonu, aby powiązać z nim transakcję.
- Kryteria akceptacji:
  - W widoku finalizacji zamówienia znajduje się pole do wpisania numeru telefonu klienta.
  - Po wpisaniu numeru telefonu (dokładne dopasowanie) i wciśnięciu "Szukaj" (lub dynamicznie), system próbuje znaleźć klienta.
  - Jeśli klient zostanie znaleziony, pola "Imię" i "Nazwisko" zostają automatycznie uzupełnione jego danymi.
  - Jeśli klient nie zostanie znaleziony, pola "Imię" i "Nazwisko" pozostają puste i wymagają ręcznego wypełnienia.

#### US-011: Tworzenie nowego klienta przy zamówieniu

- Jako Anna, jeśli obsługuję nowego klienta, chcę móc wpisać jego dane (imię, nazwisko, nieistniejący w bazie numer telefonu) podczas finalizacji, a system powinien automatycznie utworzyć dla niego rekord w bazie.
- Kryteria akceptacji:
  - W widoku finalizacji wypełniam pola: imię, nazwisko i numer telefonu, który nie istnieje w bazie.
  - Kliknięcie "Finalizuj zamówienie" powoduje zapisanie zamówienia i jednoczesne utworzenie nowego rekordu klienta w odpowiedniej tabeli.

#### US-012: Finalizacja zamówienia

- Jako Anna, po skompletowaniu koszyka i zidentyfikowaniu klienta, chcę móc sfinalizować zamówienie jednym kliknięciem, co spowoduje zapisanie transakcji i aktualizację stanów magazynowych.
- Kryteria akceptacji:
  - W widoku koszyka znajduje się przycisk "Finalizuj zamówienie", aktywny tylko, gdy koszyk nie jest pusty i dane klienta są podane.
  - Kliknięcie przycisku uruchamia proces walidacji i finalizacji.
  - Przed finalizacją, system ponownie weryfikuje każdą pozycję w koszyku. Produkty, które w międzyczasie zostały zarchiwizowane lub ich stan magazynowy spadł do zera, są usuwane z koszyka, a ja otrzymuję stosowne powiadomienie.
  - System weryfikuje, czy `stock_quantity` dla każdego pozostałego produktu w koszyku jest wystarczający.
  - Jeśli weryfikacja się powiedzie, stany magazynowe są zmniejszane, a zamówienie jest zapisywane.
  - Po pomyślnej finalizacji wyświetlane jest potwierdzenie, a koszyk jest czyszczony.
  - Jeśli weryfikacja stanu magazynowego się nie powiedzie, wyświetlany jest błąd, a stany nie są zmieniane.

### Historia zamówień

#### US-013: Przeglądanie historii zamówień

- Jako Anna, chcę mieć dostęp do chronologicznej listy wszystkich zrealizowanych zamówień, aby móc je przeglądać.
- Kryteria akceptacji:
  - W aplikacji istnieje sekcja "Historia Zamówień".
  - Zamówienia są wyświetlane na liście, posortowane od najnowszego do najstarszego.
  - Każda pozycja na liście pokazuje unikalny ID zamówienia, dane klienta (imię, nazwisko, telefon) oraz łączną kwotę.
  - Na liście zamówień widoczne są produkty, nawet jeśli zostały później zarchiwizowane.

#### US-014: Wyszukiwanie w historii zamówień

- Jako Anna, chcę móc szybko znaleźć konkretne zamówienie w historii, wyszukując je po danych klienta.
- Kryteria akceptacji:
  - W widoku historii zamówień znajduje się jedno pole wyszukiwania.
  - Wpisanie w pole numeru telefonu lub imienia/nazwiska filtruje listę, pokazując tylko pasujące zamówienia.
  - System automatycznie rozpoznaje, czy wprowadzany ciąg jest numerem telefonu, czy tekstem.

#### US-015: Archiwizacja produktu

- Jako Anna, chcę mieć możliwość zarchiwizowania produktu, którego już nie sprzedaję, zamiast go trwale usuwać, aby zachować integralność danych w historii zamówień.
- Kryteria akceptacji:
  - W panelu zarządzania produktami przy każdym produkcie znajduje się przycisk "Archiwizuj".
  - Po kliknięciu i potwierdzeniu, produkt otrzymuje status "zarchiwizowany".
  - Zarchiwizowany produkt nie jest już widoczny w głównym widoku katalogu sprzedaży.
  - Zarchiwizowany produkt nie może być dodany do nowego koszyka.
  - Jeśli zarchiwizowany produkt znajduje się w aktywnym koszyku, jest z niego usuwany.
  - Możliwe jest przywrócenie produktu ze statusu "zarchiwizowany" na "aktywny" w panelu zarządzania.

## 6. Metryki sukcesu

Dla wersji MVP świadomie rezygnuje się z implementacji wbudowanych mechanizmów śledzenia ilościowych wskaźników sukcesu (KPI). Powodzenie projektu będzie mierzone za pomocą jakościowej oceny użytkownika (Anny) po pierwszym tygodniu użytkowania.

Kluczowe pytanie, na które będziemy szukać odpowiedzi:

- Czy aplikacja w obecnej formie znacząco usprawniła i przyspieszyła proces obsługi klienta przy ladzie?

W kolejnych iteracjach produktu rozważone zostanie wdrożenie pomiaru następujących metryk:

- Średni czas od dodania pierwszego produktu do koszyka do finalizacji zamówienia.
- Odsetek zamówień, w których użyto wyszukiwarki do znalezienia produktu.
- Wskaźnik adopcji - procent zamówień stacjonarnych rejestrowanych w aplikacji.

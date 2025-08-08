# Aplikacja - MyStoreAssistant (MVP)

## Główny problem

Anna, właścicielka stacjonarnego butiku z dodatkami do wnętrz i drobną elektroniką, prowadzi sprzedaż zarówno online, jak i offline. Codziennie mierzy się z wyzwaniem synchronizacji sprzedaży internetowej ze stacjonarną, co utrudnia jej efektywną obsługę klientów przy ladzie.

**Konkretne problemy Anny:**

- Brak prostego narzędzia do szybkiego wystawiania zamówień podczas obsługi klientów przy ladzie
- Trudności z dostępem do aktualnych stanów magazynowych w czasie rzeczywistym
- Niepewność co do aktualnych cen produktów podczas sprzedaży stacjonarnej
- Rozproszone źródła danych produktowych - informacje online i offline nie są zsynchronizowane

**Potrzebne rozwiązanie:**
Anna potrzebuje intuicyjnej aplikacji webowej, która pozwoli jej na szybki dostęp do aktualnych stanów magazynowych i cen produktów, umożliwi błyskawiczne wystawianie zamówień przy ladzie oraz zapewni jedno, zsynchronizowane źródło danych produktowych aktualizowane automatycznie z API jej sklepu online.

## Najmniejszy zestaw funkcjonalności

1. Uwierzytelnianie użytkownika (Administratora sklepu)

- Konto użytkownika:
  - Brak publicznej rejestracji. Konto dla właściciela sklepu (Anny) jest tworzone za pomocą dedykowanego skryptu inicjalizującego (seed), który zapisuje jej dane (login, zahaszowane hasło) w bazie PostgreSQL.
- Logowanie:
  - Prosty formularz (adres e-mail, hasło) i endpoint API, który weryfikuje dane i zwraca bezpieczny token JWT.

2. Zarządzanie produktami i katalogiem

- Inicjalizacja katalogu:
  - W ramach skryptu inicjalizującego (seed), aplikacja jednorazowo pobiera produkty z FakeStoreAPI i zapisuje je w dedykowanej bazie, wzbogacając każdy rekord o zarządzane pole `stock_quantity`.
- Wyświetlanie i wyszukiwanie:
  - Interfejs prezentuje produkty pobrane z dedykowanej bazy danych. Dostępne są kluczowe funkcje:
    - Filtrowanie po kategoriach (lista kategorii może być pobierana na żywo z FakeStoreAPI).
    - Wyszukiwarka po nazwie produktu działająca na zasadzie dopasowania częściowego ("zawiera"), bez rozróżniania wielkości liter.
    - Możliwość łączenia filtrowania po kategoriach z wyszukiwaniem po nazwie.
    - Produkty z `stock_quantity = 0` są widoczne na liście, ale mają wyłączoną możliwość dodania do koszyka (np. przycisk nieaktywny/wyszarzony).
    - Produkty ze statusem „zarchiwizowany” nie są widoczne w głównym widoku katalogu sprzedaży; istnieje osobny widok/filtr do zarządzania produktami niedostępnymi i zarchiwizowanymi.
- Zarządzanie produktami (CRUD z archiwizacją):
  - Aplikacja pozwala na dodawanie, edycję i archiwizację produktów; trwałe usuwanie jest zablokowane, aby zachować integralność danych historycznych.
  - Formularz edycji produktu pozwala na zmianę `stock_quantity`; system nie pozwala zapisać wartości ujemnych.
  - Operacja jest najpierw wykonywana na dedykowanej bazie danych (która jest jedynym źródłem prawdy dla aplikacji).
  - Opcjonalnie, w celach demonstracyjnych, mogą być wysyłane analogiczne żądania do FakeStoreAPI (bez wpływu na wynik operacji w aplikacji i bez ciągłej synchronizacji dwukierunkowej).

3. Zarządzanie klientami

- Prosta baza klientów, w której numer telefonu jest unikalnym identyfikatorem.
- W trakcie tworzenia zamówienia można wyszukać klienta po numerze telefonu (dokładne dopasowanie); po znalezieniu dane klienta (imię, nazwisko) są automatycznie uzupełniane.
- Zmiana imienia/nazwiska przy istniejącym numerze telefonu aktualizuje dane klienta w bazie.
- Jeśli wpisany numer telefonu nie istnieje w bazie, nowy klient jest tworzony automatycznie podczas finalizacji zamówienia.

4. Proces sprzedaży

- Koszyk zamówienia:
  - Prosty interfejs umożliwiający dodanie produktów z listy do bieżącego zamówienia i określenie ich ilości.
- Finalizacja zamówienia:
  - Dedykowany, zabezpieczony endpoint, który:
    - Przyjmuje listę produktów, ich ilość oraz dane klienta (imię, nazwisko, numer telefonu).
    - Wymaga podania danych klienta (wyszukanie istniejącego lub utworzenie nowego) do finalizacji.
    - Przed zapisem wykonuje walidację po stronie serwera:
      - Usuwa z koszyka pozycje, które w międzyczasie zostały zarchiwizowane lub mają `stock_quantity = 0`, informując użytkownika.
      - Sprawdza, czy zamawiana ilość każdego produktu nie przekracza dostępnego `stock_quantity`.
    - Działa w oparciu o transakcję bazodanową, aby zapewnić spójność danych.
    - Atomowo zmniejsza `stock_quantity` dla sprzedanych produktów i zapisuje zamówienie oraz jego pozycje w odpowiednich tabelach.
    - Po pomyślnej finalizacji czyści koszyk i przygotowuje aplikację na kolejne zamówienie.

5. Historia zamówień

- Przegląd sprzedaży:
  - Chronologiczna lista wszystkich zrealizowanych zamówień (od najnowszych), pokazująca: unikalny identyfikator, dane klienta (imię, nazwisko, telefon), łączną kwotę oraz listę zakupionych produktów (widoczne także, jeśli produkty zostały później zarchiwizowane).
- Wyszukiwanie w historii:
  - Jedno pole wyszukiwania pozwalające filtrować zamówienia po numerze telefonu lub imieniu/nazwisku klienta (automatyczne rozpoznawanie typu danych wejściowych).

## Co NIE wchodzi w zakres MVP

- Zarządzanie zwrotami i reklamacjami (Obsługa zwrotów wymaga osobnej logiki (np. dodawanie towaru z powrotem na stan, generowanie korekt), co wykracza poza podstawowy proces sprzedaży).
- Programy lojalnościowe, karty podarunkowe i kody rabatowe (Są to narzędzia marketingowe, a nie kluczowe funkcje operacyjne dla MVP)
- Integracja z terminalami płatniczymi (MVP zakłada, że płatność odbywa się poza systemem (np. na osobnym terminalu), a aplikacja jedynie rejestruje fakt sprzedaży).
- Integracja z systemami księgowymi (Automatyczny eksport danych do oprogramowania księgowego to zaawansowana funkcja dla bardziej dojrzałego produktu).
- Obsługa wielu użytkowników (System w wersji MVP jest przeznaczony dla jednego typu użytkownika (właściciela) i nie zawiera rozbudowanego systemu ról i uprawnień).
- Ciągła, dwukierunkowa synchronizacja ze sklepem online po jednorazowej inicjalizacji (lokalna baza jest jedynym źródłem prawdy po imporcie startowym).
- Tworzenie historii zmian stanów magazynowych.

## Kryteria sukcesu

- W ciągu pierwszego tygodnia, 100% zamówień realizowanych w sklepie stacjonarnym jest rejestrowanych w aplikacji.
- Czas od znalezienia pierwszego produktu do sfinalizowania zamówienia (dla typowego, 3-elementowego koszyka) nie przekracza 60 sekund.
- W 9 na 10 przypadków szukany produkt odnajdywany jest w mniej niż 3 sekundy za pomocą wbudowanej wyszukiwarki.

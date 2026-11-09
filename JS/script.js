


document.addEventListener("DOMContentLoaded", function () {




    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });


        // Close menu after clicking a navigation link

        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

                menuToggle.textContent = "☰";

            });

        });

    }




    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".main-nav a").forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active");

            link.setAttribute("aria-current", "page");

        }

    });




    const filterButtons = document.querySelectorAll(".filter-btn");

    const classCards = document.querySelectorAll(".class-card");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory = button.dataset.filter;


            // Remove active class from all filter buttons

            filterButtons.forEach(function (item) {

                item.classList.remove("active");

                item.setAttribute("aria-pressed", "false");

            });


            // Activate selected filter

            button.classList.add("active");

            button.setAttribute("aria-pressed", "true");


            // Show or hide timetable cards

            classCards.forEach(function (card) {

                const category = card.dataset.category;

                if (
                    selectedCategory === "all" ||
                    category === selectedCategory
                ) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });




    const membershipSelect =
        document.querySelector("#membership-type");

    const membershipResult =
        document.querySelector("#membership-result");


    const membershipPrices = {

        basic: 399,

        unlimited: 699,

        vip: 999

    };


    if (membershipSelect && membershipResult) {

        function updateMembershipPrice() {

            const selectedPlan = membershipSelect.value;

            const price = membershipPrices[selectedPlan];


            if (price) {

                membershipResult.textContent =
                    "R" + price.toLocaleString("en-ZA") +
                    " per month";

            } else {

                membershipResult.textContent =
                    "Please select a membership plan.";

            }

        }


        membershipSelect.addEventListener(
            "change",
            updateMembershipPrice
        );


        updateMembershipPrice();

    }




    const forms = document.querySelectorAll(
        "form[data-demo-form]"
    );


    forms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            // Prevent normal form submission

            event.preventDefault();


            const message = form.querySelector(".form-message");


            // Check required fields and HTML validation rules

            if (!form.checkValidity()) {

                form.reportValidity();

                if (message) {

                    message.textContent =
                        "Please complete all required fields correctly.";

                }

                return;

            }



            

            const dateInput = form.querySelector("#date");


            if (dateInput && dateInput.value) {

                const selectedDate = new Date(
                    dateInput.value + "T00:00:00"
                );

                const today = new Date();

                today.setHours(0, 0, 0, 0);


                if (selectedDate < today) {

                    if (message) {

                        message.textContent =
                            "Please select today or a future date.";

                    }

                    dateInput.focus();

                    return;

                }

            }



           

            if (message) {

                if (form.id === "trial-form") {

                    message.textContent =
                        "Thank you! Your trial booking form has passed validation. This is a demonstration and your booking has not been sent to the studio.";

                } else {

                    message.textContent =
                        "Thank you! Your form has passed validation. This is a demonstration and your message has not been sent.";

                }

            }


            // Clear the form after successful validation

            form.reset();

        });

    });



    

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {

        element.textContent = new Date().getFullYear();

    });



    const backToTop = document.querySelector("#back-to-top");

    if (backToTop) {

        backToTop.addEventListener("click", function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


});

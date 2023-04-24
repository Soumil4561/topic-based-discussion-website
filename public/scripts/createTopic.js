let bannerImage = document.getElementById("preview-banner");
$("#banner-image").on("change", function () {
    let file = this.files[0];
    if (file) {
        let reader = new FileReader();
        reader.addEventListener("load", function () {
            bannerImage.setAttribute("src", this.result);
        });
        reader.readAsDataURL(file);
    }
});

let topicImage = document.getElementById("preview-profile");
$("#topic-image").on("change", function () {
    let file = this.files[0];
    if (file) {
        let reader = new FileReader();
        reader.addEventListener("load", function () {
            topicImage.setAttribute("src", this.result);
        });
        reader.readAsDataURL(file);
    }
});


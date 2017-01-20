function ScheduleToImage() {
    
    this.isParsable = () => {
        var popup = document.querySelector("#schedule_popup");
        return (popup === null) ? false : popup.style.display !== "none";
    }

    this.init = () => {
        this.clone = document.querySelector("#schedule_popup").cloneNode(true);
        this.clone.style.zIndex = "0"
        document.body.appendChild(this.clone);
    }

    this.resetSchedulesMinuteFormat = () => {
        var schedules_minutes = this.clone.querySelectorAll(".schedules_minute");
        schedules_minutes.forEach((item) => item.className = "schedules_minute");
    }

    this.removeHeader = () => {
        var header = this.clone.querySelector(".schedules_header");
        header.parentNode.removeChild(header);
    }

    this.replaceSelectByPlainText = () => {
        try {
            var td_array = this.clone.querySelectorAll("td.schedules_selectors");
            var selector_array = this.clone.querySelectorAll("select.schedules_selectors");

            for (var i in td_array) {
                var td = td_array[i]
                var select = selector_array[i]
                var selectedValue = select.options[select.selectedIndex].innerText
                td.removeChild(select)
                td.innerHTML += selectedValue
            }
        } catch (e) {/*not*/}
    }

    this.toImage = () => {
        html2canvas(this.clone, {
            onrendered: function (canvas) {
                var img = canvas.toDataURL()
                var dataURL = canvas.toDataURL('image/png');

                document.location.href = dataURL;
            }
        });
    }

    this.run = () => {
        this.init();
        this.resetSchedulesMinuteFormat();
        this.replaceSelectByPlainText();
        this.removeHeader();
        this.toImage();
    }
}

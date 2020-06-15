


    $(document).ready(function () {
        counter();
        setInterval(function () {
            counter();
        }, 1000);
    });



    function downloadExam(id) {

        $.ajax({
            url: '/OnlineExams/ExamDownloadDetail/',
            type: "GET",
            data: {
                id: id
            },
            success: function (d) {

                if (d == "success") {
                }
            },
            error: function () {

            },
        });


    }

    const id = "1341";
    function submitExam(id) {
        var asgComment = "commentsSubmit" + id;
        var fileUploader = "fileUploaderSubmit" + id;

        var examcomment = $('#' + asgComment).val();

        var fileUpload = $("#" + fileUploader).get(0);
        var files = fileUpload.files;
        const btn = document.getElementsByClassName("campusbox-btns")
        console.log(btn[0])
        btn[0].innerHTML= '<a href="#" data-toggle="modal" data-target="#Modal-1341"><i class="fas fa-plus"></i> Submit Exam</a>'
        btn[0].innerHTML= `<div class="modal fade show" id="Modal-1341" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog  modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" style="font-weight: 300; text-transform: uppercase; letter-spacing: 1px;">
                        <b style="font-weight: 700">Submit Exam</b>
                    </h5>
                </div>
                <div class="modal-close">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body" style="background-color: #F4F7FA;">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="profile-main-text">
                                <div class="row popup-label">
                                    <div class="col-sm-10">
                                        <label for="deptname">Title: <span class="text-danger">*</span></label>
                                        <input placeholder="Exam Title" maxlength="200" class="form-control" name="examTitle" value="E-Business" readonly="">
                                    </div>

                                    <div class="col-sm-2">
                                        <label for="deptname">Marks: <span class="text-danger">*</span></label>
                                        <input placeholder="Exam Marks" type="number" class="form-control" value="40.0" min="0" name="examMarks" readonly="">
                                    </div>
                                    <div class="col-sm-12">
                                        <label for="deptname">Comment: </label>

                                        <textarea placeholder="Place Your Comment here" maxlength="200" class="form-control" id="commentsSubmit1341" name="commentsSubmit1341"></textarea>
                                    </div>

                                    <div class="col-sm-12">
                                        <label style="max-width:100% !important;">Select File: <span class="text-danger"> (Note: Please select only text, word, power point, zip, pdf or excel file and file should be less than 50MB)</span></label>
                                        <input id="fileUploaderSubmit1341" name="fileUploaderSubmit1341" class="form-control" type="file">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" onclick="submitExam(1341)" class="btn btn-primary" value="SUBMIT">
                        Upload and Submit
                    </button>
                </div>
            </div>
        </div>
    </div>`
        if (files[0] == null || (files[0] != null && checkFileSize(files[0].size) && checkFileFormatExam($('#' + fileUploader).val()))) {
            var fdata = new FormData();
            fdata.append("File", files[0]);
            fdata.append("Id", id);
            fdata.append("comment", examcomment);
            showLoader();
            $.ajax({
                url: '/OnlineExams/submitExam',
                type: "POST",
                data: fdata,
                contentType: false,
                processData: false,
               
                success: function (d) {

                    if (d == "success") {
                        swal({
                            title: 'Submitted!',
                            text: 'Online Exam is submitted successfully.',
                            icon: 'success',
                            timer: 1500,
                            buttons: false,
                        })
                            .then(() => {
                                location.reload();
                            });
                    }
                    else {
                        swal("Error!", d, "error");
                        hideLoader();
                    }

                },
                error: function (XMLHttpRequest) {
                    hideLoader();
                    FileUploaderExceptionHandler(XMLHttpRequest.responseText);
                },
            });
        }


    }


    function counter() {
        for (var i = 0; i < 1; i++) {
            var startHidden = "#startHidden" + i;
            var expireHidden = "#expireHidden" + i;
            var expireTimer = "#expireTimer" + i;
            var startTimer = "#startTimer" + i;

            var date1, date2, date3;
            date1 = new Date();
            date2 = new Date($(expireHidden).val());
            date3 = new Date($(startHidden).val());

            if (date3 < date1 && date1 < date2) {
                if (date3 < date1) {
                    var resStart = Math.abs(date1 - date3) / 1000;

                    var daysStart = Math.floor(resStart / 86400);
                    var hoursStart = Math.floor(resStart / 3600) % 24;
                    var minutesStart = Math.floor(resStart / 60) % 60;
                    var secondsStart = resStart % 60;

                    $(startTimer).text(daysStart + "d, " + hoursStart + "h-" + minutesStart + "m-" + parseInt(secondsStart) + "s ago");
                }
                if (date2 > date1) {
                    var res = Math.abs(date2 - date1) / 1000;

                    var days = Math.floor(res / 86400);
                    var hours = Math.floor(res / 3600) % 24;
                    var minutes = Math.floor(res / 60) % 60;
                    var seconds = res % 60;

                    $(expireTimer).text(days + "d, " + hours + "h-" + minutes + "m-" + parseInt(seconds) + "s left");
                }
            }
        }
    }





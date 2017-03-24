/*Controllers begin*/
$(document).ready(function () {
    var changeColor = function () {
        if ($('#gradient').attr('checked', 'true')) {
            canvas.config.colorConf.color = getCollorPattern.gradient($('#gradient_from').val(), $('#gradient_to').val(), $('#gradient_amount').val());
        } else if ($('#rainbow').attr('checked', 'true')) {
            canvas.config.colorConf.color = getCollorPattern.rainbow;
        }
    };
    $('input[name=color_type]').on('change', changeColor);
    $('#gradient_from').on('change', changeColor);
    $('#gradient_to').on('change', changeColor);
    $('#gradient_amount').on('change', changeColor);

    $('#color_sequence').on('change', function () {
        canvas.config.colorConf.pattern = $(this).val();
    });
    $('#shapes_size').on('change', function () {
        canvas.config.size = parseInt($(this).val());
    });
    $('#shapes_space').on('change', function () {
        canvas.config.space = parseInt($(this).val());
    });
    $('#opacity_from').on('change', function () {
        var val = parseInt($(this).val());
        val = val < 0 ? 0 : val;
        val = val > 100 ? 100 : val;
        canvas.config.opacity.min = val / 100;
    });
    $('#opacity_to').on('change', function () {
        var val = parseInt($(this).val());
        val = val < 0 ? 0 : val;
        val = val > 100 ? 100 : val;
        canvas.config.opacity.max = val / 100;
    });
    $('#timeout').on('change', function () {
        var val = parseInt($(this).val());
        clearInterval(interval);
        interval = setInterval(run, val);
    });
    $('#shape').on('change', function () {
        canvas.config.fill =$(this).val();
    });
});
/*Controllers end*/
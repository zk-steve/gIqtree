const fs = require("fs");
const os = require("os");

const BASE_COMMAND = os.type() === "Windows_NT" ? "iqtree2.exe" : "iqtree2";

const SETTING_FORMAT = JSON.parse(fs.readFileSync("../base.json", {encoding: 'utf-8'}));

const readingModel = (object_model, setting_format, command_line = []) => {
    const result = command_line;
    Object.keys(object_model).forEach(key => {
        const value = object_model[key];
        if (typeof value === 'object') {
            readingModel(value, setting_format[key], result);
        }
        else if (typeof value === 'string') {
            result.push(setting_format[key] + " " + value)
        }
        else if (value === true) {
            result.push(setting_format[key]);
        }
    })
    return result;
}

const mappingCommand = (object_model, setting_format) => {
    let data = readingModel(object_model, setting_format);
    return BASE_COMMAND + " -s " + data.join(" ")
}

const example = {
    data: {
        partition_file: "hihi1",
        sequence_type: {
            dna: true
        }
    },
    model: {
        substitution_model: true,
        rate_heterogeneity_across_sites: {
            allow_proportion_of_invariable_sites: true
        }
    }
}

// store(base_command)
const data = mappingCommand(example, SETTING_FORMAT);
console.log(data)
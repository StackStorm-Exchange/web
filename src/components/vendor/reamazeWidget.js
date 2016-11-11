var _support = _support || { "ui": {}, "user": {} };
_support["account"] = "stackstorm";
_support["custom_fields"] = {
  source: {
    type: "hidden",
    value: "StackStorm Exchange"
  },
  slack_username: {
    type: "text",
    value: "",
    placeholder: "Community Slack username",
    required: true
  },
  pack_url: {
    type: "text",
    value: "",
    placeholder: "Pack URL (GitHub preferred)",
    required: true
  },
};
